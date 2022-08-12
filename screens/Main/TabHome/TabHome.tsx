import { View, Text, TextInput, Image, ScrollView } from "react-native";
import React from "react";
import { blueColorApp, textLight } from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import ButtonText from "../../../components/Item/ButtonText";
import { RootTabScreenProps } from "../../../navigation/types";

export default function TabHome({ navigation }: RootTabScreenProps<"TabHome">) {
  const navContractScreen = () => {
    navigation.navigate("Contract");
  };
  const navBillScreen = () => {
    navigation.navigate("Bill");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#f3f5fe" }}>
      <View
        style={{
          height: 220,
          backgroundColor: blueColorApp,
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: 40,
            width: "90%",
            height: 60,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 2,
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: 60,
                backgroundColor: "#ececec",
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
              }}
            >
              <Ionicons name="search-circle" size={48} color={blueColorApp} />
            </View>
            <TextInput
              placeholder={"Hôm nay ,bạn tìm gì ?"}
              selectionColor={blueColorApp}
              style={{
                paddingLeft: 10,
                width: 150,
                height: "100%",
                backgroundColor: "#fff",
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              height: "100%",
              flexDirection: "row",
              marginLeft: 10,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Ionicons name="chatbubble-outline" size={28} color={"#fff"} />
            </View>

            <View
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Ionicons name="call-outline" size={28} color={"#fff"} />
            </View>

            <View
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Ionicons name="notifications-outline" size={28} color={"#fff"} />
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            width: Layout.window.width - 40,
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <ButtonText
            imageSource={require("../../../assets/images/main/tab1/contract.png")}
            text={"Hợp đồng"}
            color={"#fff"}
            colorText={"#fff"}
            size={28}
            onPress={navContractScreen}
          />
          <ButtonText
            imageSource={require("../../../assets/images/main/Main2.png")}
            text={"Hóa đơn"}
            color={"#fff"}
            colorText={"#fff"}
            size={28}
            onPress={navBillScreen}
          />
        </View>
      </View>
      <ScrollView>
        <View style={{ height: Layout.window.height - 220 }}>
          <View
            style={{
              height: 120,
              backgroundColor: "#f3f3f3",
              borderRadius: 10,
              margin: 10,
            }}
          >
            <Image
              source={require("../../../assets/images/main/tab1/png-clipart-water-water-surface-wave.png")}
              resizeMode="cover"
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
          </View>

          <View
            style={{
              height: 130,
              backgroundColor: "#fff",
              borderRadius: 10,
              margin: 10,
              paddingLeft: 20,
              paddingTop: 10,
            }}
          >
            <Text style={{ color: textLight, fontSize: 16, fontWeight: "600" }}>
              Nổi bật
            </Text>
            <View style={{ flexDirection: "row" }}>
              <ButtonText
                imageSource={require("../../../assets/images/main/tab1/xemchisonuoc.png")}
                text={"Xem chỉ số nước"}
                color={blueColorApp}
                colorText={textLight}
                size={28}
                sizeText={12}
                width={60}
                height={75}
              />
              <ButtonText
                imageSource={require("../../../assets/images/main/tab1/yeucauphucvu.png")}
                text={"Yêu cầu phục vụ"}
                color={blueColorApp}
                colorText={textLight}
                size={28}
                sizeText={12}
                width={60}
                height={75}
              />
              <ButtonText
                imageSource={require("../../../assets/images/main/tab1/gioithieubanbe.png")}
                text={"giới thiệu bạn bè"}
                color={blueColorApp}
                colorText={textLight}
                size={28}
                sizeText={12}
                width={60}
                height={75}
              />
            </View>
          </View>
          <View
            style={{
              height: 130,
              backgroundColor: "#fff",
              borderRadius: 10,
              margin: 10,
              paddingLeft: 20,
              paddingTop: 10,
            }}
          >
            <Text style={{ color: textLight, fontSize: 16, fontWeight: "600" }}>
              Tra Cứu
            </Text>
            <View style={{ flexDirection: "row" }}>
              <ScrollView horizontal={true}>
                <ButtonText
                  imageSource={require("../../../assets/images/main/tab1/gianuoc.png")}
                  text={"giá nước"}
                  color={blueColorApp}
                  colorText={textLight}
                  size={28}
                  sizeText={12}
                  width={60}
                  height={75}
                />
                <ButtonText
                  imageSource={require("../../../assets/images/main/tab1/chatluongnuoc.png")}
                  text={"Chất lượng nước"}
                  color={blueColorApp}
                  colorText={textLight}
                  size={28}
                  sizeText={12}
                  width={60}
                  height={75}
                />
                <ButtonText
                  imageSource={require("../../../assets/images/main/tab1/diemthuphi.png")}
                  text={"Điểm thu phí"}
                  color={blueColorApp}
                  colorText={textLight}
                  size={28}
                  sizeText={12}
                  width={60}
                  height={75}
                />
                <ButtonText
                  imageSource={require("../../../assets/images/main/tab1/lichngungcapnuoc.png")}
                  text={"Lịch tạm ngưng cấp nước"}
                  color={blueColorApp}
                  colorText={textLight}
                  size={28}
                  sizeText={12}
                  width={60}
                  height={75}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
