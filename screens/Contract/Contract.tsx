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
import { blueColorApp } from "../../constants/Colors";
import ItemHopDong from "./ItemContract";
import { RootStackScreenProps } from "../../navigation/types";
import { navGoBack } from "../../utils/helper/navigationHelper";
import GoBackArrow from "../../components/Item/GoBackArrow";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { WaterUserType } from "../../utils/api/apiTypes";
import ApiRequest from "../../utils/api/Main/ApiRequest";
import {
  ChangeWaterFactory,
  logOut,
} from "../../redux/features/auth/authSlices";
import Spinner from "react-native-loading-spinner-overlay/lib";
export default function Contract({
  navigation,
}: RootStackScreenProps<"Contract">) {
  const tag = "Contract";
  const { token, userName } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [listWaterUser, setlistWaterUser] = useState<Array<WaterUserType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (token && userName) {
      ApiRequest.getAllWaterUserByUser(token, userName.replace(/-/g, ""))
        .then((data) => {
          setlistWaterUser(data.result.data);
          console.log(`${tag} get detail success`, data.result.data);
          setLoading(false);
        })
        .catch(() => {
          dispatch(logOut());
          setLoading(false);
        });
    }
  }, [dispatch, token, userName]);
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
        <FlatList
          data={listWaterUser}
          renderItem={({ item }) => (
            <ItemHopDong
              item={item}
              onPress={() => {
                if (token && userName && item.waterFactoryId && item.name) {
                  dispatch(
                    ChangeWaterFactory({
                      token: token,
                      userName: userName,
                      waterFactoryId: item.waterFactoryId,
                      waterUserId: item.id,
                      waterUserName: item.name,
                    })
                  );
                  Alert.alert("Chọn hợp đồng", item.code + " " + item.name);

                  navigation.goBack();
                }
              }}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoImage: { width: 100, height: 100 },
});
