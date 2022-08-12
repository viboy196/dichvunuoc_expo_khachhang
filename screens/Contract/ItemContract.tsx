import { View, Text } from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { blueColorApp, textLight } from "../../constants/Colors";
export default function ItemHopDong() {
  return (
    <View
      style={{
        height: 200,
        margin: 10,
        backgroundColor: "#d9e2fd",
        borderRadius: 10,
        paddingLeft: 20,
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",

          alignItems: "center",
        }}
      >
        <Ionicons name="home" size={32} color={blueColorApp} />
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 10 }}>
          <Text style={{ color: blueColorApp, fontSize: 16 }}>
            Hợp Đồng mặc định
          </Text>

          <Text style={{ color: "#000", fontSize: 16 }}>
            Số hợp đồng : HND41974
          </Text>
        </View>
        <Ionicons name="file-tray-full" size={24} color={"#000"} />
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>HND41974</Text>

        <Text style={{ color: textLight }}>
          So 1 , Ngo 10A , TT Khien Truc , Cau Vong , Phuong Duc Thang , Q.Bac
          Tu Lien , Ha Noi
        </Text>
      </View>
    </View>
  );
}
