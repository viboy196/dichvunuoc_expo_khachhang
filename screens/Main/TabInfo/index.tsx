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
import ItemCaNhan from "./ItemInfo";
import Layout from "../../../constants/Layout";
import { blueColorApp, textLight } from "../../../constants/Colors";
import { useAppDispatch } from "../../../redux/store/hooks";
import { logOut } from "../../../redux/features/auth/authSlices";

export default function TabInfo() {
  const dispatch = useAppDispatch();
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
            height: 200,
            width: Layout.window.width,
            backgroundColor: blueColorApp,
            justifyContent: "center",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 20 }}
          >
            <Image
              source={require("../../../assets/images/main/tabCaNhan/avatar.jpg")}
              style={{ width: 80, height: 80, borderRadius: 100 }}
              resizeMode="cover"
            />
            <Text style={{ color: "#fff", fontSize: 24, marginLeft: 10 }}>
              Nguyễn Văn Đàn
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: Layout.window.width,
          }}
        >
          <ScrollView>
            <ItemCaNhan name="Thông tin cá nhân" />

            <ItemCaNhan name="Thông tin Khác" />
            <ItemCaNhan name="Thông tin Khác" />
            <ItemCaNhan name="Điều Khoản Chính sách" />

            <ItemCaNhan
              name="Đăng xuất"
              iconName="log-out"
              onPress={() => {
                dispatch(logOut());
              }}
            />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoImage: { width: 100, height: 100 },
});
