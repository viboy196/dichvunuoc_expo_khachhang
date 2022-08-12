import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootLoginParamList } from "../../navigation/types";

import LoginScreen from "./Login";
import LoginAfterScreen from "./LoginAfter";

export default function Login() {
  const Stack = createNativeStackNavigator<RootLoginParamList>();
  return (
    <Stack.Navigator initialRouteName="one">
      <Stack.Screen
        name="one"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="two"
        component={LoginAfterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
