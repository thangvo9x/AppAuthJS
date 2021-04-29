import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthenticationScreen from "./screens/AuthenticationScreen";

const Stack = createStackNavigator();

export default function App() {
  const linking = {
    prefixes: ["mobilepoc://welcome"],
    config: {
      screens: {
        WelcomeScreen: "welcome",
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="AuthenticationScreen">
        <Stack.Screen
          name="LoginScreen"
          options={{ header: () => null }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="WelcomeScreen"
          options={{ header: () => null }}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="AuthenticationScreen"
          component={AuthenticationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
