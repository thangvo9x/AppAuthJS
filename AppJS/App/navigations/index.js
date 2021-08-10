import * as React from 'react';
import { memo } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigationRef } from './utils';

import Routes from 'utils/route';

import AuthNavigator from './Auth';
import MainNavigator from './Main';

const Stack = createStackNavigator();

let NavStack = memo(() => {
  return (
    <Stack.Navigator initialRouteName={Routes.Main}>
      <Stack.Screen
        name={Routes.Main}
        options={{ header: () => null }}
        component={MainNavigator}
      />
      <Stack.Screen
        name={Routes.Auth}
        options={{ header: () => null }}
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
  //     },
  //   },
  // };
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <NavStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
});
export default App;
