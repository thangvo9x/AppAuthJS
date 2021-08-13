/** @format */

import * as React from 'react';
import { memo } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigationRef } from './utils';

import Routes from 'utils/route';

import AuthNavigator from './Auth';
import MainNavigator from './Main';

const Stack = createStackNavigator();

let NavStack = memo(() => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Main}
      screenOptions={{
        headerTintColor: '#000',
        headerBackTitle: true,
        headerStyle: {
          elevation: 1,
          shadowRadius: 1,
          shadowOffset: {
            height: 1,
          },
          borderBottomColor: 'rgba(201, 206, 214, 0.5)',
          borderBottomWidth: 1,
        },
      }}
    >
      <Stack.Screen
        name={Routes.Main}
        options={{ headerShown: false }}
        component={MainNavigator}
      />
      <Stack.Screen
        name={Routes.Auth}
        options={{ headerShown: false }}
        component={AuthNavigator}
      />
    </Stack.Navigator>
  );
});

const App = memo(() => {
  // const linking = {
  //   prefixes: ['mobilepoc://'],
  //   config: {
  //     screens: {
  //       Dashboard: 'welcome',
  //       Dashboard: 'logout',
  //     },
  //   },
  // };
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer ref={navigationRef}>
        <NavStack />
      </NavigationContainer>
    </>
  );
});
export default App;
