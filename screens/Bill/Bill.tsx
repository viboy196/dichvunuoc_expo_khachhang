import {
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
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
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import { logOut } from "../../redux/features/auth/authSlices";

import Spinner from "react-native-loading-spinner-overlay/lib";
export default function Bill({ navigation }: RootStackScreenProps<"Bill">) {
  const tag = "Bill";
  const { token, waterUserId, waterUserName } = useAppSelector(
    (state) => state.auth
  );
  const [listBill, setListBill] = useState<Array<any>>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [textEmty, setTextEmty] = useState<string>("Chưa có hóa Đơn");

  console.log(listBill.length);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token && waterUserId) {
      ApiRequest.WaterInvoiceAllByWaterUser(token, waterUserId)
        .then((data) => {
          setLoading(false);
          setListBill(data.result.data);
          console.log(`${tag} get detail success`);
        })
        .catch(() => {
          setLoading(false);
          dispatch(logOut());
        });
    } else {
      setLoading(false);
      setTextEmty("Chưa chọn hợp đồng ");
      Alert.alert("Thông báo", "Chọn hợp đồng để xem hóa đơn");
      navigation.navigate("Contract");
    }
  }, [dispatch, waterUserId, token]);
  return (
    <View
      style={{
        width: Layout.window.width,
        height: Layout.window.height,
        backgroundColor: "#fff",
        alignItems: "center",
      }}
    >
      <Spinner
        visible={loading}
        textContent={"Loading ..."}
        textStyle={{ color: "#fff", fontSize: 20 }}
      />
      <View
        style={{
          flex: 1,
          width: Layout.window.width,
        }}
      >
        {listBill.length > 0 ? (
          <FlatList
            data={listBill}
            renderItem={({ item }) => (
              <ItemHoaDon
                item={item}
                thanhtoan={true}
                name={waterUserName}
                onPress={() => {
                  if (
                    waterUserId &&
                    waterUserName &&
                    item.waterMeterNumber > 0
                  ) {
                    navigation.navigate("WaterInvoice", {
                      waterUserId: waterUserId,
                      name: waterUserName,
                      month: item.month,
                      year: item.year,
                    });
                  }
                }}
              />
            )}
          />
        ) : (
          <View
            style={{
              width: Layout.window.width,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text style={{ color: textLight, fontSize: 20, fontWeight: "500" }}>
              {textEmty}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoImage: { width: 100, height: 100 },
});
