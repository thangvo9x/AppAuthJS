/** @format */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from 'configs';
import * as React from 'react';
import { memo } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Routes from 'utils/route';
import AuthNavigator from './Auth';
import MainNavigator from './Main';
import { navigationRef } from './utils';

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

const toastConfig = {
  // only for error for now
  error: (internalState) => (
    <View style={styles.toastContainer}>
      <Text style={styles.textWhite}>{internalState.text1}</Text>
    </View>
  ),
};

const App = memo(() => {
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer ref={navigationRef}>
        <NavStack />
      </NavigationContainer>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </>
  );
});

const styles = StyleSheet.create({
  toastContainer: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: Colors.Black,
  },
  textWhite: {
    color: Colors.White,
  },
});
export default App;
