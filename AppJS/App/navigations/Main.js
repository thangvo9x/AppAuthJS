import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from 'configs';
import DrawerContainer from 'containers/Drawer';
import Routes from 'utils/route';
import { Icon } from '@ant-design/react-native';
import DashboardStack from './DashboardStack';
import UserProfileStack from './UserProfileStack';

const Tab = createBottomTabNavigator();
const MainTab = () => {
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
