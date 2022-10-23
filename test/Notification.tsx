import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Alert, Platform } from "react-native";
import { getFullPath } from "../navigation";
import { logOut } from "../redux/features/auth/authSlices";
import { setStateNotification } from "../redux/features/notification/NotificationSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import ApiRequest from "../utils/api/Main/ApiRequest";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState<string>();

  const { token, userName } = useAppSelector((s) => s.auth);

  const noti = useAppSelector((s) => s.noti);

  const dispatch = useAppDispatch();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  //add this
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log(notification.request.content);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    if (
      expoPushToken &&
      token &&
      userName &&
      noti.expoToken !== expoPushToken
    ) {
      ApiRequest.AppTokenAdd(token, {
        token: expoPushToken,
        system: Platform.OS === "android" ? "android" : "ios",
        userName: userName,
      })
        .then((res) => {
          if (res.code === "00") {
            console.log("register token successs");
            Alert.alert("success", expoPushToken);
            dispatch(
              setStateNotification({ input: { expoToken: expoPushToken } })
            );
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(logOut());
        });
    }
  }, [expoPushToken, token, userName]);
  useEffect(() => {
    if (lastNotificationResponse) {
      //console.log(lastNotificationResponse);

      //get the route
      const data = JSON.stringify(
        lastNotificationResponse.notification.request.content.data
      );
        console.log();
        
      //use some function to return the correct screen by route
      // getFullPath(JSON.parse(data));
    }
  }, [lastNotificationResponse]);

  return <></>;
}

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: "Here is the notification body",
//       data: { data: "goes here" },
//     },
//     trigger: { seconds: 1 },
//   });
// }

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
