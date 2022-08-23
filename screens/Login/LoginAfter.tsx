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
  setState,
  setStateAuthRemember,
  UsersState,
} from "../../redux/features/auth/authSlices";
import { Styles } from "../../utils/helper/Styles";
import ApiRequest from "../../utils/api/Main/ApiRequest";

import jwt_decode from "jwt-decode";
export default function LoginAfter({
  route,
  navigation,
}: RootLoginProps<"two">) {
  const { loading, password, checkedAuth, userName, errorMessage } =
    useAppSelector((state) => state.auth);
  const { name, no: phoneNo } = route.params;
  const phone = phoneNo.replace(/-/g, "");
  const [textPassword, setTextPassword] = useState<string>(
    phoneNo === userName && password ? password : ""
  );

  const [showPassword, setshowPassword] = useState<boolean>(true);
  const [checked, setChecked] = useState(checkedAuth);
  const [clickLogin, setClickLogin] = React.useState<number>(0);
  const [textError, setTextError] = useState<string | undefined>();
  const [loading1, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const onPressLogin = () => {
    if (textPassword === "") {
      setTextError("Nhập mật khẩu");
    }

    if (textPassword && validatePassword(textPassword)) {
      setClickLogin((old) => {
        return old + 1;
      });
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
    } else {
      setTextError("mật khẩu nhiều hơn 6 ký tự");
    }
  };

  const onPressLogin1 = () => {
    if (textPassword === "") {
      setTextError("Nhập mật khẩu");
    }

    if (textPassword && validatePassword(textPassword)) {
      setClickLogin((old) => {
        return old + 1;
      });
      setLoading(true);
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
      ApiRequest.LoginApi({ phone: phoneNo, password: textPassword })
        .then((res) => {
          if (res.code === "00") {
            setLoading(false);
            let state = {} as UsersState;
            const decode = jwt_decode(res.result) as object;
            try {
              state = {
                ...state,
                loading: "succeeded",
                token: res.result,
                // @ts-ignore
                userName:decode[ "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
              };
            } catch {
              state = {
                ...state,
                loading: "succeeded",
                token: res.result,
              };
            }
            dispatch(setState({ input: state }));
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setTextError("mật khẩu nhiều hơn 6 ký tự");
    }
  };

  useEffect(() => {
    console.log("vao day");

    if (errorMessage && clickLogin > 0) {
      setTextError(errorMessage);
    }
  }, [errorMessage, clickLogin]);
  return (
    <ScrollView>
      <View style={Styles.view_Container}>
        <Spinner
          visible={loading1}
          textContent={"Đăng Nhập ..."}
          textStyle={{ color: "#fff" }}
        />
        {/* header */}
        <View style={Styles.view_LoginAfter_Header}>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
            style={Styles.view_arrow_back_1}
          >
            <View style={Styles.view_arrow_back_2}>
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
            style={Styles.image_logoImage}
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
              // @ts-ignore
              onChangeText={(text) => {
                setTextError(undefined);
                setTextPassword(text);
              }}
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
            {textError && (
              <Text style={{ color: "red", position: "absolute", bottom: -25 }}>
                {textError}
              </Text>
            )}
          </View>
          <View
            style={{
              width: Layout.window.width - 40,
              marginVertical: 30,
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
            <TouchableOpacity>
              <Text style={{ fontStyle: "italic", color: textLight }}>
                Quên mật Khẩu
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            disabled={!textPassword}
            style={{ marginBottom: 40 }}
            onPress={onPressLogin1}
          >
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
