import {
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Text } from "../../components/Themed";
import Layout from "../../constants/Layout";
import Ionicons from "@expo/vector-icons/Ionicons";
import Checkbox from "expo-checkbox";
import { blueColorApp, textLight } from "../../constants/Colors";
import { RootLoginProps } from "../../navigation/types";
import { InputBox } from "../../test/Test1";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { validatePassword } from "../../utils/validate";

import Spinner from "react-native-loading-spinner-overlay/lib";
import {
  loginAsync,
  setStateAuthRemember,
} from "../../redux/features/auth/authSlices";
export default function LoginAfter({
  route,
  navigation,
}: RootLoginProps<"two">) {
  const { loading, password, checkedAuth, userName } = useAppSelector(
    (state) => state.auth
  );
  const { name, no: phoneNo } = route.params;
  const phone = phoneNo.replace(/-/g, "");
  const [textPassword, setTextPassword] = useState<string>(
    phoneNo === userName && password ? password : ""
  );

  const [showPassword, setshowPassword] = useState<boolean>(true);
  const [checked, setChecked] = useState(checkedAuth);
  const [clickLogin, setClickLogin] = React.useState(false);

  const dispatch = useAppDispatch();
  const onPressLogin = () => {
    if (textPassword && validatePassword(textPassword)) {
      setClickLogin(true);
      dispatch(
        setStateAuthRemember({
          input: {
            loading: "idle",
            checkedAuth: checked,
            userName: phoneNo,
            password: textPassword,
          },
        })
      );
      dispatch(loginAsync({ phone: phone, password: textPassword }));
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          width: Layout.window.width,
          height: Layout.window.height,
          backgroundColor: "#fff",
          alignItems: "center",
        }}
      >
        {loading === "pending" && clickLogin && (
          <Spinner
            visible={true}
            textContent={"Đăng Nhập ..."}
            textStyle={{ color: "#fff" }}
          />
        )}
        {/* header */}
        <View
          style={{
            flex: 3,
            width: Layout.window.width,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
            style={{
              left: 0,
              top: 40,
              position: "absolute",
            }}
          >
            <View
              style={{
                width: 80,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={"md-arrow-back-outline"}
                size={38}
                color={showPassword ? blueColorApp : "#8e8e8e"}
              />
            </View>
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/LogoApp/Logo_256_256.png")}
            resizeMode="cover"
            style={styles.logoImage}
          />
          <Text>Xin chào</Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "500",
              marginTop: 10,
              color: textLight,
            }}
          >
            {name}
          </Text>
        </View>
        <View
          style={{
            flex: 4,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: textLight,
              fontSize: 16,
            }}
          >
            Nhập mật khẩu
          </Text>
          <View
            style={{
              width: Layout.window.width - 40,
              height: 60,
              borderBottomWidth: 1,
              borderBottomColor: "#aaaaaa",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <InputBox
              // @ts-ignore
              autoFocus={true}
              keyboardType={"default"}
              onChangeText={setTextPassword}
              secureTextEntry={showPassword}
              value={textPassword}
              pHolder={"Password"}
              style={{
                fontSize: 28,
                alignItems: "center",
                justifyContent: "center",
                width: Layout.window.width - 40,
                textAlign: "center",
              }}
              selectionColor={blueColorApp}
              // color={"white"}
            />
            <TouchableOpacity
              onPress={() => setshowPassword((old) => !old)}
              style={{ position: "absolute", right: 0 }}
            >
              <View
                style={{
                  width: 50,
                  height: 60,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color={showPassword ? blueColorApp : "#8e8e8e"}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: Layout.window.width - 40,
              marginVertical: 20,
              flexDirection: "row",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                style={{}}
                value={checked}
                onValueChange={setChecked}
                color={checked ? blueColorApp : undefined}
              />
              <Text style={{ marginLeft: 5, color: textLight }}>
                Ghi nhớ tài Khoản
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{}}>
              <Text style={{ fontStyle: "italic", color: textLight }}>
                Quên mật Khẩu
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={{ marginBottom: 40 }} onPress={onPressLogin}>
            <View
              style={{
                width: Layout.window.width - 40,
                height: 60,
                backgroundColor: textPassword ? blueColorApp : "#c6c9cd",
                borderRadius: 10,
                marginTop: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>Đăng Nhập</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoImage: { width: 100, height: 100 },
});
