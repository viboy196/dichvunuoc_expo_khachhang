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
import { blueColorApp } from "../../constants/Colors";
import ItemHopDong from "./ItemContract";
import { RootStackScreenProps } from "../../navigation/types";
import { navGoBack } from "../../utils/helper/navigationHelper";
import GoBackArrow from "../../components/Item/GoBackArrow";

export default function Contract({
  navigation,
}: RootStackScreenProps<"Contract">) {
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
                Hợp đồng
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
            <ItemHopDong />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoImage: { width: 100, height: 100 },
});
