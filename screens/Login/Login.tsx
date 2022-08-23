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
import { Styles } from "../../utils/helper/Styles";
export default function Login({ navigation }: RootLoginProps<"one">) {
  const { userName } = useAppSelector((state) => state.auth);
  const [textInput, setTextInput] = useState<string>(userName ? userName : "");

  const [textError, setTextError] = useState<string | undefined>();

  const [loading, setLoading] = useState<boolean>(false);

  const nextPress = useCallback(() => {
    if (textInput === undefined || textInput === "") {
      setTextError("Chưa nhập SĐT hoặc CCCD ");
      return;
    }
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
            switch (res.errorMessage) {
              case "Not found": {
                setTextError("Không tìm thấy tài khoản từ SĐT hoặc CCCD");
              }
              default: {
                setTextError(res.errorMessage);
              }
            }
          }
        })
        .catch((res) => {
          setLoading(false);
        });
    } else {
      setTextError("Nhập sai định dạng số điện thoại hoặc cccd");
    }
  }, [textInput]);

  return (
    <ScrollView>
      <View style={Styles.view_Container}>
        <Spinner
          visible={loading}
          textContent={"Kiểm tra ..."}
          textStyle={{ color: "#FFF" }}
        />
        {/* header */}
        <View style={Styles.view_Login_Header}>
          <Image
            source={require("../../assets/images/LogoApp/Logo_256_256.png")}
            resizeMode="cover"
            style={Styles.image_logoImage}
          />
          <Text style={Styles.text_Header_Logo}>DICHVUNUOC</Text>
        </View>
        {/* body */}
        <View style={Styles.view_Login_Body}>
          <Text style={Styles.text_Title_Input}>Nhập SĐT hoặc CCCD</Text>
          <View style={Styles.view_TextInput}>
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
                setTextError(undefined);
                // if (text?.length == 4) {
                //   setTextInput(`${text}-`);
                //   return;
                // }
                // if (text?.length == 8) {
                //   setTextInput(`${text}-`);
                //   return;
                // }
                setTextInput(text);
              }}
              selectionColor={blueColorApp}
              blurOnSubmit={false}
            />

            <TouchableOpacity
              onPress={() => setTextInput("")}
              style={{ position: "absolute", right: 0 }}
            >
              <View style={Styles.view_Button_RemoteText}>
                <Ionicons name="close-circle" size={24} color="#8e8e8e" />
              </View>
            </TouchableOpacity>
            {textError && <Text style={Styles.text_Error}>{textError}</Text>}
          </View>

          <TouchableOpacity onPress={nextPress}>
            <View
              style={{
                ...Styles.view_Button_Big,
                backgroundColor: textInput ? blueColorApp : "#c6c9cd",
              }}
            >
              <Text style={Styles.text_Btn_Big}>Tiếp Tục</Text>
            </View>
          </TouchableOpacity>
          <View style={{ width: Layout.window.width - 40, marginTop: 20 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={{ color: "#5a595b" }}>Đăng ký tài khoản</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* footer */}
        <View style={Styles.view_Footer}>
          <View style={{ flex: 1 }}>
            <ButtonText
              imageSource={require("../../assets/images/login/footerLogin1.png")}
              text={"Gửi yêu cầu cấp nước"}
              onPress={() => {
                navigation.navigate("InstallWaterScreen");
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ButtonText
              imageSource={require("../../assets/images/login/footerLogin2.png")}
              text={"Xem thủ tục cấp nước"}
              onPress={() => {
                navigation.navigate("ViewProcessScreen");
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ButtonText
              imageSource={require("../../assets/images/login/footerLogin3.png")}
              text={"Tra cứu tiến độ hồ sơ"}
              onPress={() => {
                navigation.navigate("MyWebView", {
                  title: "Tra cứu Tiến độ hồ sơ",
                  url: "http://dichvunuoc.vn/show/dvn_mobile_dangky_tiendo",
                });
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ButtonText
              imageSource={require("../../assets/images/login/footerLogin4.png")}
              text={"Liên hệ"}
              onPress={() => {
                Alert.alert("Tổng đài CSKH", "1900 400 002");
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
