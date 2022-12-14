import React, { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../../../components/Themed";
import layout from "../../../constants/Layout";
import { blueColorApp } from "../../../constants/Colors";
import { Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import ApiRequest from "../../../utils/api/Main/ApiRequest";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function FamilyScreen() {
  const tag = "FamilyScreen";
  const [textFullName, setTextFullName] = useState<string>();

  const [textIdentification, setTextIdentification] = useState<string>();

  const [textIdentificationDate, setTextIdentificationDate] =
    useState<string>();

  const [textPhoneNumber, setTextPhoneNumber] = useState<string>();

  // const [textPhoneMessage, setTextPhoneMessage] = useState<string>();

  const [textEmail, setTextEmail] = useState<string>();

  const [textAddress, setTextAddress] = useState<string>();

  const [provinceId, setProvinceId] = useState<string>();
  const [listProvince, setListProvince] = useState<Array<any>>();

  const [districtId, setDistrictId] = useState<string>();
  const [listDistrict, setListDistrict] = useState<Array<any>>();

  const [wardId, setWardId] = useState<string>();
  const [listWard, setListWard] = useState<Array<any>>();

  const [waterFactoryId, setWaterFactoryId] = useState<string>();
  const [listWaterFactory, setListWaterFactory] = useState<Array<any>>();

  const [textReson, setTextReson] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const getDistrictByProvinceId = async (_provinceId: string) => {
    ApiRequest.GetDistrictByProvinceId({ provinceId: _provinceId })
      .then((data) => {
        setListDistrict(data.result.data);
        console.log(`${tag} get detail success`);
        setDistrictId("");
        setLoading(false);
      })
      .catch(() => {
        Alert.alert("L???i", "T???i t???nh/tp b??? l???i");
      });
  };
  const getWardByDistrictId = async (_districtId: string) => {
    ApiRequest.GetWardByDistrictId({ districtId: _districtId })
      .then((data) => {
        setListWard(data.result.data);
        console.log(`${tag} get detail success`);
        setWardId("");
        setLoading(false);
      })
      .catch(() => {
        Alert.alert("L???i", "T???i t???nh/tp b??? l???i");
      });
  };
  useEffect(() => {
    ApiRequest.GetProvinceAll()
      .then((data) => {
        setListProvince(data.result.data);
        console.log(`${tag} get detail success`);
        setProvinceId("");
        setLoading(false);
      })
      .catch(() => {
        Alert.alert("L???i", "T???i t???nh/tp b??? l???i");
      });
    ApiRequest.GetWaterFactoryAll()
      .then((data) => {
        setListWaterFactory(data.result.data);
        console.log(`${tag} get detail success`);
        setProvinceId("");
        setLoading(false);
      })
      .catch(() => {
        Alert.alert("L???i", "T???i t???nh/tp b??? l???i");
      });
  }, []);
  const UseWaterRegister = useCallback(() => {
    if (textFullName === undefined || textFullName === "") {
      Alert.alert("Tr?????ng T??n kh??ch h??ng ko ???????c ????? tr???ng");
    }
    if (waterFactoryId === undefined || waterFactoryId === "") {
      Alert.alert("Ch???n nh?? m??y n?????c s??? d???ng");
    }
    setLoading(true);
    ApiRequest.PostUseWaterRegisterAdd({
      name: textFullName,
      identification: textIdentification,
      mobilePhone: textPhoneNumber,
      email: textEmail,
      address: textAddress,
      provinceId,
      districtId,
      wardId,
      reson: textReson,
      waterFactoryId,
      unitTypeId: "Individual",
    })
      .then((data) => {
        if (data.code === "00") {
          Alert.alert("Th??ng b??o", "G???i ????ng k?? th??nh c??ng");
        } else {
          Alert.alert("Th??ng b??o", data.errorMessage);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Alert.alert("L???i", "c?? l???i s???y ra");
      });
  }, [
    districtId,
    provinceId,
    textAddress,
    textEmail,
    textFullName,
    textIdentification,
    textPhoneNumber,
    textReson,
    wardId,
    waterFactoryId,
  ]);
  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={loading}
        textContent={"Loading ..."}
        textStyle={{ color: "#fff", fontSize: 20 }}
      />

      <ScrollView>
        <View style={{ margin: 10 }}>
          <Text
            style={{ color: blueColorApp, fontWeight: "bold", fontSize: 18 }}
          >
            1. Th??ng tin ????ng k??
          </Text>
          {/* t??n kh??ch h??ng */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>T??n ch??? h???,ch??? s??? h???u nh??</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"T??N KH??CH H??NG"}
                onChangeText={setTextFullName}
                value={textFullName}
              />
            </View>
          </View>
          {/* c??n c?????c c??ng d??n */}
          <View
            style={{ width: layout.window.width - 20, flexDirection: "row" }}
          >
            <View style={{ flex: 3, marginRight: 5 }}>
              <Text style={{ marginVertical: 5 }}>CCCD/CMTND(*)</Text>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#e3e3e3",
                  paddingHorizontal: 10,
                  flexDirection: "row",
                }}
              >
                <TextInput
                  style={{ width: "100%" }}
                  keyboardType={"numeric"}
                  placeholder={"S??? CCCD/CMTND"}
                  onChangeText={setTextIdentification}
                  value={textIdentification}
                />
              </View>
            </View>
            <View style={{ flex: 2, marginLeft: 5 }}>
              <Text style={{ marginVertical: 5 }}>Ng??y c???p</Text>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#e3e3e3",
                  paddingHorizontal: 10,
                  flexDirection: "row",
                }}
              >
                <TextInput
                  style={{ width: "100%" }}
                  keyboardType="default"
                  placeholder={"Ng??y C???p"}
                  onChangeText={setTextIdentificationDate}
                  value={textIdentificationDate}
                />
              </View>
            </View>
          </View>
          {/* ??i???n tho???i */}
          <View
            style={{ width: layout.window.width - 20, flexDirection: "row" }}
          >
            <View style={{ flex: 3, marginRight: 5 }}>
              <Text style={{ marginVertical: 5 }}>??i???n tho???i(*)</Text>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#e3e3e3",
                  paddingHorizontal: 10,
                  flexDirection: "row",
                }}
              >
                <TextInput
                  style={{ width: "100%" }}
                  placeholder={"??T li??n h???"}
                  keyboardType={"numeric"}
                  onChangeText={setTextPhoneNumber}
                  value={textPhoneNumber}
                />
              </View>
            </View>
          </View>
          {/* ?????a ch??? email  */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>?????a ch??? email</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"nh???p ?????a ch??? email"}
                keyboardType={"email-address"}
                onChangeText={setTextEmail}
                value={textEmail}
              />
            </View>
          </View>
          {/* ?????a chir l???p ?????t */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>?????a ch??? L???p ?????t</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"Nh???p s??? nh?? , ng?? ng??ch , t??n ???????ng , th??n , ph???"}
                onChangeText={setTextAddress}
                value={textAddress}
              />
            </View>
            <Picker
              style={styles.viewInput}
              placeholder="ch???n t???nh/th??nh ph???"
              selectedValue={provinceId}
              onValueChange={(itemValue, itemIndex) => {
                if (provinceId !== itemValue) {
                  setProvinceId(itemValue);
                  console.log(itemIndex);
                  setLoading(true);
                  getDistrictByProvinceId(itemValue);
                }
              }}
            >
              <Picker.Item label={"ch???n t???nh/th??nh ph???"} value={undefined} />
              {listProvince?.map((item) => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
            <Picker
              style={styles.viewInput}
              placeholder="ch???n Qu???n/Huy???n"
              selectedValue={districtId}
              onValueChange={(itemValue, itemIndex) => {
                if (districtId !== itemValue) {
                  setDistrictId(itemValue);
                  console.log(itemIndex);
                  setLoading(true);
                  getWardByDistrictId(itemValue);
                }
              }}
            >
              <Picker.Item label={"Ch???n Qu???n/Huy???n"} value={undefined} />
              {listDistrict?.map((item) => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
            <Picker
              style={styles.viewInput}
              placeholder="ch???n ph?????ng/x??"
              selectedValue={wardId}
              onValueChange={(itemValue, itemIndex) => {
                setWardId(itemValue);
                console.log(itemIndex);
              }}
            >
              <Picker.Item label={"Ch???n Ph?????ng/x??"} value={undefined} />
              {listWard?.map((item) => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
          </View>
          {/* m???c ????ch s??? d???ng  */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>M???c ????ch s??? d???ng</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ width: "100%" }}
                placeholder={"Nh???p m???c ????ch s??? d???ng"}
                onChangeText={setTextReson}
                value={textReson}
              />
            </View>
          </View>
          {/* nh?? m??y n?????c s??? d???ng */}
          <View style={{ width: layout.window.width - 20 }}>
            <Text style={{ marginVertical: 5 }}>Nh?? m??y n?????c s??? d???ng</Text>
            <Picker
              style={styles.viewInput}
              placeholder="ch???n nh?? m??y n?????c"
              selectedValue={waterFactoryId}
              onValueChange={(itemValue, itemIndex) => {
                if (waterFactoryId !== itemValue) {
                  setWaterFactoryId(itemValue);
                  console.log(itemIndex);
                }
              }}
            >
              <Picker.Item label={"ch???n nh?? m??y n?????c"} value={undefined} />
              {listWaterFactory?.map((item) => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
          </View>
          <Button
            style={{
              marginTop: 5,
              borderRadius: 10,
              backgroundColor: blueColorApp,
            }}
            mode="contained"
            onPress={UseWaterRegister}
          >
            G???i ????ng k??
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewInput: {
    borderRadius: 10,
    backgroundColor: "#e3e3e3",
    paddingHorizontal: 10,
    flexDirection: "row",
    marginVertical: 2,
  },
});
