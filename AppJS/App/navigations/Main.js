/** @format */

import React, { useCallback, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Colors } from 'configs';
import DrawerContainer from 'containers/Drawer';
import Routes from 'utils/route';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'actions/auth';
import { rehydration } from 'redux/store';

import { Icon } from '@ant-design/react-native';
import DashboardStack from './DashboardStack';
import UserProfileStack from './UserProfileStack';

const Tab = createBottomTabNavigator();
const MainTab = () => {
  const [isLoggedIn, userInfo] = useSelector((state) => {
    return [state.auth.isLoggedIn, state.auth.account.user];
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const resetNavigation = useCallback(
    (routeName) => {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      });
      navigation.dispatch(resetAction);
    },
    [navigation]
  );

  useEffect(() => {
    const checkAuth = async () => {
      await rehydration();

      if (userInfo && userInfo.exp && userInfo.exp < Date.now() / 1000) {
        dispatch(logout()); // logoutUser
      }

      navigation.navigate(Routes.Main);
    };
    checkAuth();
  }, [resetNavigation, isLoggedIn, userInfo]);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.Primary,
        inactiveTintColor: Colors.Black,
        showLabel: false,
      }}
    >
      <Tab.Screen
        name={Routes.DashboardStack}
        component={DashboardStack}
        options={{
          tabBarIcon: ({ color }) => <Icon color={color} name={'home'} />,
        }}
      />
      <Tab.Screen
        name={Routes.UserProfile}
        component={UserProfileStack}
        options={{
          tabBarIcon: ({ color }) => <Icon color={color} name={'user'} />,
        }}
      />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const MainNavigator = () => {
  return (
    <Drawer.Navigator
      backBehavior="none"
      drawerContent={(props) => <DrawerContainer {...props} />}
    >
      <Drawer.Screen name={Routes.DrawerMain} component={MainTab} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
