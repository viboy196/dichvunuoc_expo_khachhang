import {
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Checkbox from "expo-checkbox";
import Layout from "../../../constants/Layout";
import { blueColorApp } from "../../../constants/Colors";
import ButtonText from "../../../components/Item/ButtonText";
import ItemHoaDon from "../../Bill/ItemBill";

export default function TabPayment() {
  const [textPassword, setTextPassword] = useState<string>();
  const [isChecked, setChecked] = useState(false);

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
        {/* header */}
        <View
          style={{
            height: 230,
            width: Layout.window.width,
            backgroundColor: blueColorApp,
          }}
        >
          <View
            style={{
              height: 60,
              top: 20,
              alignItems: "center",
              flexDirection: "row",
              marginHorizontal: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingLeft: 30,
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "500", color: "#fff" }}>
                Thanh toán
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ButtonText
                imageSource={require("../../../assets/images/main/tabThanhtoan/1.png")}
                text={"thẻ của tôi"}
                colorText={"#fff"}
                width={100}
                height={150}
                size={64}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ButtonText
                imageSource={require("../../../assets/images/main/tabThanhtoan/2.png")}
                text={"Trả tự động"}
                colorText={"#fff"}
                width={100}
                height={150}
                size={64}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ButtonText
                imageSource={require("../../../assets/images/main/tabThanhtoan/3.png")}
                text={"Trả trước"}
                colorText={"#fff"}
                width={100}
                height={150}
                size={64}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ButtonText
                imageSource={require("../../../assets/images/main/tabThanhtoan/4.png")}
                text={"Trả hộ"}
                colorText={"#fff"}
                width={100}
                height={150}
                size={64}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: Layout.window.width,
            backgroundColor: "#f1f2fe",
          }}
        >
          <ScrollView>
            <View
              style={{
                marginTop: 40,
              }}
            >
              <ItemHoaDon thanhtoan={false} />
              <ItemHoaDon thanhtoan={false} />
            </View>
          </ScrollView>
          <View
            style={{
              width: Layout.window.width - 60,
              marginLeft: 30,
              height: 80,
              backgroundColor: "#fff",
              position: "absolute",
              top: -40,
              borderRadius: 20,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: blueColorApp, marginTop: 20 }}>
                Hóa Đơn
              </Text>
              <View style={{ flex: 1 }} />
              <View
                style={{
                  width: 40,
                  height: 5,
                  backgroundColor: blueColorApp,
                  marginBottom: 20,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Lịch sử</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoImage: { width: 100, height: 100 },
});
