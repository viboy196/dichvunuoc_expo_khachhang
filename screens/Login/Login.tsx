import {
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text } from "../../components/Themed";
import Layout from "../../constants/Layout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { blueColorApp } from "../../constants/Colors";
import ButtonText from "../../components/Item/ButtonText";
import { validatePhoneNumber } from "../../utils/validate";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { RootLoginProps, RootStackScreenProps } from "../../navigation/types";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useAppSelector } from "../../redux/store/hooks";
export default function Login({ navigation }: RootLoginProps<"one">) {
  const { userName } = useAppSelector((state) => state.auth);
  const [textInput, setTextInput] = useState<string>(userName ? userName : "");
  const [loading, setLoading] = useState<Boolean>(false);
  const nextPress = useCallback(() => {
    const input = textInput?.replace(/-/g, "");
    if (input.length == 9 || input.length == 12) {
      setLoading(true);
      ApiRequest.getFullName("0", input)
        .then((res) => {
          setLoading(false);
          if (res.code === "00") {
            navigation.navigate("two", {
              no: textInput,
              name: res.result.fullName,
            });
          } else {
            Alert.alert("Lỗi ", res.errorMessage);
          }
        })
        .catch((res) => {
          setLoading(false);
        });
    } else if (validatePhoneNumber(input)) {
      console.log("đúng rồi");
      setLoading(true);
      ApiRequest.getFullName(input)
        .then((res) => {
          setLoading(false);
          if (res.code === "00") {
            navigation.navigate("two", {
              no: textInput,
              name: res.result.fullName,
            });
          } else {
            Alert.alert("Lỗi ", res.errorMessage);
          }
        })
        .catch((res) => {
          setLoading(false);
        });
    } else {
      console.log("Số phone sai");
    }
  }, [textInput]);
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
        {loading && (
          <Spinner
            visible={true}
            textContent={"Kiểm tra ..."}
            textStyle={{ color: "#FFF" }}
          />
        )}
        {/* header */}
        <View
          style={{ flex: 3, justifyContent: "flex-end", alignItems: "center" }}
        >
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
        </View>
        {/* body */}
        <View
          style={{
            flex: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#5a595b",
              fontSize: 16,
            }}
          >
            Nhập SĐT hoặc CCCD
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
            <TextInput
              autoFocus={true}
              keyboardType={"numeric"}
              style={{
                width: "100%",
                fontSize: 28,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
              value={textInput}
              onChangeText={(text) => {
                if (text?.length == 4) {
                  setTextInput(`${text}-`);
                  return;
                }
                if (text?.length == 8) {
                  setTextInput(`${text}-`);
                  return;
                }
                setTextInput(text);
              }}
              selectionColor={blueColorApp}
              blurOnSubmit={false}
            />
            <TouchableOpacity
              onPress={() => setTextInput("")}
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
                <Ionicons name="close-circle" size={24} color="#8e8e8e" />
              </View>
            </TouchableOpacity>
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
          <View style={{ width: Layout.window.width - 40, marginTop: 30 }}>
            {/* <Checkbox
                style={{ margin: 8 }}
                value={isChecked}
                onValueChange={() =>
                  setChecked((old) => {
                    return !old;
                  })
                }
                color={isChecked ? blueColorApp : undefined}
              /> */}
            <TouchableOpacity>
              <Text style={{ color: "#5a595b" }}>Đăng ký tài khoản</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* footer */}
        <View
          style={{
            height: 150,
            width: Layout.window.width - 40,
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <ButtonText
              imageSource={require("../../assets/images/login/footerLogin1.png")}
              text={"Gửi yêu cầu cấp nước"}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ButtonText
              imageSource={require("../../assets/images/login/footerLogin2.png")}
              text={"Xem thủ tục cấp nước"}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ButtonText
              imageSource={require("../../assets/images/login/footerLogin3.png")}
              text={"Tra cứu tiến độ hồ sơ"}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ButtonText
              imageSource={require("../../assets/images/login/footerLogin4.png")}
              text={"Liên hệ"}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoImage: { width: 100, height: 100 },
});
