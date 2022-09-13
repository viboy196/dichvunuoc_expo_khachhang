import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootRegisterParamList } from "../../navigation/types";

import Register1Screen from "./Register1";
import Register2Screen from "./Register2";
import Register3Screen from "./Register3";

export default function Register() {
  const Stack = createNativeStackNavigator<RootRegisterParamList>();
  return (
    <Stack.Navigator initialRouteName="Register1">
      <Stack.Screen
        name="Register1"
        component={Register1Screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register2"
        component={Register2Screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register3"
        component={Register3Screen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
