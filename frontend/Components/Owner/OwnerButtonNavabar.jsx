import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Buttonnavbar = () => {
  const navigation = useNavigation();


  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10,
        elevation: 50, paddingLeft: 20, paddingRight: 20
      }}
    >

      <View >
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("orders")}>
          <Icon name="copy1" size={20} color="gray" style={{ alignSelf: "center" }} />
          <Text style={{ color: "gray" }}>Orders</Text></TouchableOpacity>

      </View>
      <View style={{ marginLeft: "auto", color: "gray" }} >
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("sidesAndDrinks")}>
          {/* <Ionicons name="food-fork-drink" size={20} style={{ color: "gray", alignSelf: "center" }} /> */}
          <Ionicons name="fast-food" size={20} style={{ color: "gray", alignSelf: "center" }} />
          <Text style={{ color: "gray" }} >Sides/Drinks</Text></TouchableOpacity>

      </View>
      <View style={{ marginLeft: "auto", color: "gray" }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("addFoods")}>
          <Icon name="pluscircle" size={20} style={{ color: "gray", alignSelf: "center" }} />
          <Text style={{ color: "gray" }}>Add Item </Text>
        </TouchableOpacity>

      </View>
      <View style={{ marginLeft: "auto", color: "gray" }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("addTags")}>
          <Icon name="tags" size={20} style={{ color: "gray", alignSelf: "center" }} />
          <Text style={{ color: "gray" }}>Add tags</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default Buttonnavbar;
