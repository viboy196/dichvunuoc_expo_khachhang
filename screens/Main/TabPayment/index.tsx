import {
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Checkbox from "expo-checkbox";
import Layout from "../../../constants/Layout";
import { blueColorApp, textLight } from "../../../constants/Colors";
import ButtonText from "../../../components/Item/ButtonText";
import ItemHoaDon from "../../Bill/ItemBill";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import ApiRequest from "../../../utils/api/Main/ApiRequest";
import { logOut } from "../../../redux/features/auth/authSlices";
import { RootTabScreenProps } from "../../../navigation/types";
import Spinner from "react-native-loading-spinner-overlay/lib";
export default function TabPayment({
  navigation,
}: RootTabScreenProps<"TabPayment">) {
  const tag = "Bill";
  const { token, waterUserId, waterUserName } = useAppSelector(
    (state) => state.auth
  );
  const [listBill, setListBill] = useState<Array<any>>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [clickBtn, setClickBtn] = useState<boolean>(true);

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
            top: 35,
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
        <View
          style={{
            marginTop: 40,
          }}
        >
          <Spinner
            visible={loading}
            textContent={"Loading ..."}
            textStyle={{ color: "#fff", fontSize: 20 }}
          />
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
              <Text
                style={{ color: textLight, fontSize: 20, fontWeight: "500" }}
              >
                Chưa có hóa đơn
              </Text>
            </View>
          )}
        </View>
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
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              setClickBtn(true);
            }}
          >
            {clickBtn ? (
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
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: textLight, marginTop: 20 }}>Hóa Đơn</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              setClickBtn(false);
            }}
          >
            {!clickBtn ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: blueColorApp, marginTop: 20 }}>
                  Lịch sử
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
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: textLight, marginTop: 20 }}>Lịch sử</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoImage: { width: 100, height: 100 },
});
