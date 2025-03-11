import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "react-use-cart";
import PastOrderItem from "./PastOrderItem";
import { FoodieContext } from "./Global";
const Buttonnavbar = () => {
  const navigation = useNavigation();

  const {cartItems} = useContext(FoodieContext);
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
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Home")}>
          <Icon name="home" size={20} color="gray" style={{ alignSelf: "center" }} />
          <Text style={{ color: "gray" }}>Home</Text></TouchableOpacity>

      </View>
      <View style={{ marginLeft: "auto", color: "gray" }} >
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("orderHistory")}>
          <Icon name="copy1" size={20} style={{ color: "gray", alignSelf: "center" }} />
          <Text style={{ color: "gray" }} >Orders</Text></TouchableOpacity>

      </View>
      <View style={{ marginLeft: "auto", color: "gray" }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("cart")}>
          <Icon name="shoppingcart" size={20} style={{ color: "gray", alignSelf: "center" }} />
          <Text style={{ color: "gray" }}>Cart {cartItems.length}</Text>
        </TouchableOpacity>

      </View>
      <View style={{ marginLeft: "auto", color: "gray" }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("My Profile")}>
          <Icon name="user" size={20} style={{ color: "gray", alignSelf: "center" }} />
          <Text style={{ color: "gray" }}>Account</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default Buttonnavbar;
