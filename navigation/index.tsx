/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import MainScreen from "../screens/Main";
import LoginScreen from "../screens/Login";

import { RootStackParamList } from "./types";
import LinkingConfiguration from "./LinkingConfiguration";
import { useAppSelector } from "../redux/store/hooks";
import ContractScreen from "../screens/Contract/Contract";
import BillScreen from "../screens/Bill/Bill";
import WaterInvoiceScreen from "../screens/WaterInvoice/WaterInvoice";
import InfoDetailScreen from "../screens/Main/TabInfo/InfoDetail";

import WebViewScreen from "../screens/Login/WebView";
import { blueColorApp } from "../constants/Colors";

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export function getFullPath(data: {
  waterUserId: string;
  name: string;
  year: string;
  month: string;
}) {
  return navigationRef.current?.navigate("WaterInvoice", data);
}
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { token } = useAppSelector((state) => state.auth);
  if (token) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Contract"
          component={ContractScreen}
          options={{
            headerStyle: { backgroundColor: blueColorApp },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            title: `H???p ?????ng`,
          }}
        />
        <Stack.Screen
          name="Bill"
          component={BillScreen}
          options={{
            headerStyle: { backgroundColor: blueColorApp },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            title: `H??a ????n`,
          }}
        />
        <Stack.Screen
          name="WaterInvoice"
          component={WaterInvoiceScreen}
          options={({ route }) => ({
            headerStyle: { backgroundColor: blueColorApp },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            title: `H??a ????n ti???n n?????c th??ng ${route.params.month}`,
          })}
        />
        <Stack.Screen
          name="MyWebView"
          component={WebViewScreen}
          options={({ route }) => ({
            title: `${route.params.title}`,
            headerStyle: { backgroundColor: blueColorApp },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        />
        <Stack.Screen
          name="InfoDetail"
          component={InfoDetailScreen}
          options={({ route }) => ({
            title: `Th??ng tin c?? nh??n`,
            headerStyle: { backgroundColor: blueColorApp },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
