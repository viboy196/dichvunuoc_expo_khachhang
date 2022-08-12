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
import ItemHoaDon from "./ItemBill";
import GoBackArrow from "../../components/Item/GoBackArrow";
import { RootStackScreenProps } from "../../navigation/types";
export default function Bill({ navigation }: RootStackScreenProps<"Bill">) {
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
            height: 120,
            width: Layout.window.width,
            backgroundColor: blueColorApp,
          }}
        >
          <View
            style={{
              height: 60,
              left: 0,
              top: 40,
              alignItems: "center",
              flexDirection: "row",
              marginHorizontal: 10,
            }}
          >
            <GoBackArrow navigation={navigation} />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "700", color: "#fff" }}>
                Hóa Đơn
              </Text>
            </View>
            <Ionicons name={"ellipsis-vertical"} size={38} color={"#fff"} />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: Layout.window.width,
          }}
        >
          <ScrollView>
            <ItemHoaDon thanhtoan={true} />

            <ItemHoaDon />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoImage: { width: 100, height: 100 },
});
