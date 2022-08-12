import { TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { navGoBack } from "../../utils/helper/navigationHelper";
export default function GoBackArrow({navigation}:{navigation:any}) {
  return (
    <TouchableOpacity
      style={{ width: 60, height: 60, justifyContent: "center" }}
      onPress={() => navGoBack(navigation)}
    >
      <Ionicons name={"md-arrow-back-outline"} size={38} color={"#fff"} />
    </TouchableOpacity>
  );
}
