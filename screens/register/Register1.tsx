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
import { validateName, validatePhoneNumber } from "../../utils/validate";
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
}: RootRegisterProps<"Register1">) {
  const [textPhone, setTextPhone] = useState<string>();

  const [textFullName, setTextFullName] = useState<string>();

  const [loading, setLoading] = useState<boolean>(false);
  const nextPress = useCallback(() => {
    const input = textPhone?.replace(/-/g, "");
    if (
      validatePhoneNumber(input) &&
      textPhone &&
      validateName(textFullName) &&
      textFullName
    ) {
      navigation.navigate("Register2", {
        fullName: textFullName,
        userName: textPhone,
      });
    } else {
      console.log("Số phone sai");
    }
  }, [textPhone]);
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
          textContent={"Kiểm tra ..."}
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
            source={require("../../assets/images/LogoApp/Logo_256_256.png")}
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
            DICHVUNUOC
          </Text>
          <Text
            style={{
              color: textLight,
              fontSize: 26,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Đăng ký tài khoản
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
              title={"Họ và tên"}
              value={textFullName}
              onChangeInput={(text: string) => {
                console.log(text);
                setTextFullName(text);
              }}
              icon="person"
              color={blueColorApp}
              errorMessages={
                validateName(textFullName)
                  ? undefined
                  : "Số điện thoại không hợp lệ"
              }
            />

            <Input
              title={"Số điện thoại"}
              value={textPhone}
              onChangeInput={setTextPhone}
              keyboardType={"numeric"}
              icon="call"
              color={blueColorApp}
              errorMessages={
                validatePhoneNumber(textPhone)
                  ? undefined
                  : "Số điện thoại không hợp lệ"
              }
            />
          </View>

          <TouchableOpacity onPress={nextPress}>
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
              <Text style={{ color: "#fff" }}>Tiếp Tục</Text>
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
