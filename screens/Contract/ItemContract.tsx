import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { blueColorApp, textLight } from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
export default function ItemHopDong({ item , onPress }: { item: any; onPress: () => void }) {
  const {token, userName} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity onPress={onPress}>
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
          <Ionicons name="home" size={32} color={blueColorApp} />
          <View style={{ flex: 1, justifyContent: "center", marginLeft: 10 }}>
            <Text style={{ color: blueColorApp, fontSize: 16 }}>Hợp Đồng</Text>

            <Text style={{ color: "#000", fontSize: 16 }}>
              Mã hợp đồng : {item.code}
            </Text>
          </View>
          <Ionicons name="file-tray-full" size={24} color={"#000"} />
        </View>
        <View style={{ justifyContent: "center", marginVertical: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>{item.code}</Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: textLight }}>
            Người đại diện : {item.name}
          </Text>
          <Text style={{ color: textLight }}> địa chỉ : {item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
