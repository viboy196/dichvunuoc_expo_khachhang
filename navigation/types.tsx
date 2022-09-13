/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Main: NavigatorScreenParams<RootTabParamList> | undefined;
  Login: NavigatorScreenParams<RootLoginParamList> | undefined;
  Contract: undefined;
  Bill: undefined;
  WaterInvoice: {
    waterUserId: string;
    name: string;
    year: string;
    month: string;
  };
  MyWebView: { title: string; url: string };
  InfoDetail: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootLoginParamList = {
  one: undefined;
  two: { name: string; no: string };
  Register: NavigatorScreenParams<RootRegisterParamList> | undefined;
  InstallWaterScreen: undefined;
  InstallWaterFamilyScreen: undefined;
  InstallWaterCompanyScreen: undefined;
  ViewProcessScreen: undefined;
  MyWebView: { title: string; url: string };
};
export type RootLoginProps<Screen extends keyof RootLoginParamList> =
  NativeStackScreenProps<RootLoginParamList, Screen>;

export type RootRegisterParamList = {
  Register1: undefined;
  Register2: { userName: string; fullName: string };
  Register3: { otp: string };
};
export type RootRegisterProps<Screen extends keyof RootRegisterParamList> =
  NativeStackScreenProps<RootRegisterParamList, Screen>;

export type RootTabParamList = {
  TabHome: undefined;
  TabPayment: undefined;
  TabRequest: undefined;
  TabInfo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
