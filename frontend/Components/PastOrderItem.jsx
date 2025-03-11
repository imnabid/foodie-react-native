import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Global from "./Global";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "react-use-cart";

const PastOrderItem = () => {
  const navigation = useNavigation();
  const [pastOrders, setPastOrders] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    fetchPastOrders();
  }, []);

  const fetchPastOrders = async () => {
    try {
      const response = await fetch("http://192.168.1.66:9002/order-history");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched past orders:", data);
      setPastOrders(data);
    } catch (error) {
      console.error("Failed to fetch past orders:", error);
      setPastOrders([]);
    }
  };

  const handleReorder = (order) => {
    const {
      id,
      foodName,
      price,
      selectedSides,
      selectedSidesPrices,
      selectedDrinks,
      selectedDrinksPrices,
      quantity,
      description,
      image
    } = order;

    addItem({
      id: id,
      name: foodName,
      price: price,
      description: description,
      quantity: quantity,
      selectedDrinks: selectedDrinks,
      selectedSides: selectedSides,
      selectedSidesPrices: selectedSidesPrices,
      selectedDrinksPrices: selectedDrinksPrices,
      image: image
    });

    navigation.navigate("mycart");
  };

  return (
    <View style={{ padding: 25, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", marginTop: 20, paddingBottom: 0 }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={25} color={"#df2020"} />
        </TouchableOpacity>

        <Text style={{ textAlign: "center", flex: 1, lineHeight: 25, fontSize: Global.fontSize.large, fontWeight: "bold", color: "#df2020" }}>
          Orders
        </Text>
      </View>

      <ScrollView style={{ marginTop: 20,marginBottom:50 }} showsVerticalScrollIndicator={false}>
        {pastOrders && pastOrders.length > 0 ? (
          pastOrders.map((order, index) => (
            <View key={index} style={{ flexDirection: "row", backgroundColor: Global.color.backgroundcolor, borderRadius: 15, marginTop: 8, paddingHorizontal: 10, paddingVertical: 5 }}>
              <View style={{ width: 100, height: 100, borderRadius: 50, overflow: "hidden", marginRight: 10 ,alignSelf:"center"}}>
                <Image source={{ uri: order.image }} style={{ width: "100%", height: "100%" }} />
              </View>
              <View style={{ flex: 1,padding:5,paddingTop:10 }}>
                <Text>Date: {order.orderedDate}</Text>
                <Text style={{fontWeight:"bold"}}>Food: {order.foodName}</Text>
                <Text>{order.description}</Text>
                <Text style={{fontWeight:"bold"}}>Quantity: {order.quantity}</Text>

                {order.selectedSides.length > 0 && (
                  <Text>Sides: {order.selectedSides.join(", ")}</Text>
                )}

                {order.selectedDrinks.length > 0 && (
                  <Text>Drinks: {order.selectedDrinks.join(", ")}</Text>
                )}

                <Text style={{fontWeight:"bold"}}>Total Price: Rs.{order.price}</Text>

                <TouchableOpacity
                style={{
                  backgroundColor: "#df2020",
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 0,
                  marginLeft:"auto",
                  marginRight:10
                }}
                onPress={() => handleReorder(order)}
              >
                <Text style={{ color: "white" }}>Reorder</Text>
              </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text>No past orders found</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default PastOrderItem;
