/** @format */

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginToolbar, Logo, MenuBurger } from 'components';
import Dashboard from 'containers/Dashboard';
import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import Routes from 'utils/route';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const DashboardStack = memo(() => {
  const navigation = useNavigation();

  const [isLoggedIn] = useSelector((state) => {
    return [state.auth.isLoggedIn];
  });

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Dashboard}
        name={Routes.Dashboard}
        options={{
          title: null,
          headerLeft: () => (
            <View style={styles.rowLogo}>
              {isLoggedIn && (
                <MenuBurger onPress={() => navigation.toggleDrawer()} />
              )}
              <Logo />
            </View>
          ),
          headerRight: () => <LoginToolbar />,
          headerTitleAlign: 'left',
        }}
      />
    </Stack.Navigator>
  );
});

const styles = StyleSheet.create({
  rowLogo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
});
export default DashboardStack;
