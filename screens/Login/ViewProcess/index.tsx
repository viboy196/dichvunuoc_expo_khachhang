import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../../components/Themed";
import { blueColorApp } from "../../../constants/Colors";
import {
  RootLoginProps,
  RootStackScreenProps,
} from "../../../navigation/types";
export default function ViewProcessScreen({
  navigation,
}: RootLoginProps<"ViewProcessScreen">) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MyWebView", {
            title: " Thủ tục cấp nước gia đình ",
            url: "http://dichvunuoc.vn/show/dvn_mobile_thutuc_giadinh",
          });
        }}
      >
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require("../../../assets/images/installWater/home.png")}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}> Thủ tục đấu nối cấp nước </Text>
            <Text style={styles.itemTextinfo}> Khách hàng hộ gia đình </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MyWebView", {
            title: " Thủ tục cấp nước cơ quan ",
            url: "http://dichvunuoc.vn/show/dvn_mobile_thutuc_coquan",
          });
        }}
      >
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require("../../../assets/images/installWater/building.png")}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}> Thủ tục đấu nối cấp nước </Text>
            <Text style={styles.itemTextinfo}>
              {" "}
              Khách hàng cơ quan , doanh nghiệp{" "}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewItemImage: {
    width: 75,
    alignItems: "center",
    justifyContent: "center",
    height: 75,
    backgroundColor: blueColorApp,
    borderRadius: 75,
    marginRight: 10,
    marginLeft: 10,
  },
  itemImage: {
    width: 35,
    height: 35,
    tintColor: "#fff",
  },
  items: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  viewItemText: {
    flex: 6,
    justifyContent: "center",
    borderRadius: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2d86ff",
  },
  itemTextinfo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#929292",
  },
});
