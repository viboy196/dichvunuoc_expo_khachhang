import {
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { lazy, useCallback, useEffect, useRef, useState } from "react";
import { Text } from "../../components/Themed";
import Layout from "../../constants/Layout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { blueColorApp, textLight } from "../../constants/Colors";
import {
  validateName,
  validatePassword,
  validatePasswordReDo,
  validatePhoneNumber,
} from "../../utils/validate";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import Input from "../../components/Item/InputForm";

import {
  RootLoginProps,
  RootRegisterProps,
  RootStackScreenProps,
} from "../../navigation/types";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useAppSelector } from "../../redux/store/hooks";
import GoBackArrow from "../../components/Item/GoBackArrow";
export default function Register1({
  navigation,
  route,
}: RootRegisterProps<"Register2">) {
  const [textPassword, setTextPassword] = useState<string>();

  const [textPasswordRedo, setTextPasswordRedo] = useState<string>();
  const { fullName, userName } = route.params;

  const [loading, setLoading] = useState<boolean>(false);
  const registerPress = useCallback(() => {
    navigation.navigate("Register3", { otp: "123" });
    return;
    setLoading(true);
    if (
      textPassword &&
      validatePassword(textPassword) &&
      textPasswordRedo &&
      validatePasswordReDo(textPassword, textPasswordRedo)
    )
      ApiRequest.RegisterApi({
        fullName: fullName,
        passwordHash: textPassword,
        userName: userName,
      })
        .then((data) => {
          if (data.code === "00") {
            Alert.alert("Thành công", "Đăng ký thành công");
          }
          if (data.errorMessage) {
            Alert.alert("Lỗi", data.errorMessage);
          }

          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
  }, [textPassword, textPasswordRedo]);
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
        <Spinner
          visible={loading}
          textContent={"Đăng ký ..."}
          textStyle={{ color: "#FFF" }}
        />
        {/* header */}
        <View
          style={{
            height: 250,
            width: Layout.window.width,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              position: "absolute",
              left: 20,
              top: 50,
            }}
          >
            <GoBackArrow navigation={navigation} color={blueColorApp} />
          </View>
          <Image
            source={require("../../assets/images/LogoApp/thinkfoodlogo.png")}
            resizeMode="cover"
            style={styles.logoImage}
          />
          <Text
            style={{
              color: blueColorApp,
              fontSize: 28,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Cửa Phật
          </Text>
          <Text
            style={{
              color: textLight,
              fontSize: 26,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Nhập Mật Khẩu
          </Text>
        </View>
        {/* body */}
        <View
          style={{
            flex: 4,
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: 30,
          }}
        >
          <View
            style={{ marginHorizontal: 20, width: Layout.window.width - 40 }}
          >
            <Input
              title={"Mật khẩu"}
              value={textPassword}
              secureTextEntry={true}
              onChangeInput={(text: string) => {
                console.log(text);
                setTextPassword(text);
              }}
              icon="key"
              color={blueColorApp}
              errorMessages={
                validatePassword(textPassword)
                  ? undefined
                  : "Mật khẩu phải nhiều hơn 6 kí tự"
              }
            />
            <View style={{ height: 10 }} />
            <Input
              title={"Nhập lại mật khẩu"}
              value={textPasswordRedo}
              secureTextEntry={true}
              onChangeInput={setTextPasswordRedo}
              icon="key-outline"
              color={blueColorApp}
              errorMessages={
                validatePasswordReDo(textPasswordRedo, textPassword)
                  ? undefined
                  : "Nhập lại mật khẩu không trùng khớp"
              }
            />
          </View>

          <TouchableOpacity onPress={registerPress}>
            <View
              style={{
                width: Layout.window.width - 40,
                height: 60,
                backgroundColor: blueColorApp,
                borderRadius: 10,
                marginTop: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>Đăng Ký</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{ width: Layout.window.width - 40, paddingVertical: 20 }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                navigation.goBack();
              }}
            >
              <Text style={{ color: "#5a595b" }}>Quay Lại Đăng Nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoImage: { width: 100, height: 100 },
});
