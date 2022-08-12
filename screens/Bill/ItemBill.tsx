import { View, Text, Image } from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { blueColorApp, textLight } from "../../constants/Colors";
export default function ItemHoaDon({ thanhtoan }: { thanhtoan?: boolean }) {
  return (
    <View
      style={{
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
        <Image
          source={require("../../assets/images/LogoApp/Logo_256_256.png")}
          style={{ width: 48, height: 48 }}
        />
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 20 }}>
          <Text style={{ color: "#000", fontSize: 16 }}>HND41974</Text>

          <Text style={{ color: textLight, fontSize: 16 }}>
            Pham Trong Hieu
          </Text>

          <Text style={{ color: "#000", fontSize: 16 }}>HND41974</Text>
        </View>
        {thanhtoan ? (
          <Ionicons name="checkmark-circle" size={48} color={"#00ad63"} />
        ) : (
          <View
            style={{
              width: 80,
              height: 40,
              borderRadius: 10,
              backgroundColor: "#f24056",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>
              Thanh toán
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
