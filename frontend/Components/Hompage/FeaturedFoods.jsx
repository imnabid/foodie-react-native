import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, Alert } from "react-native";
import { FoodCard, FoodTitle, FoodieContext } from "../Global";
import ipAddress from '../Global';
import { useNavigation } from "@react-navigation/native";

const Popular = ({ foods }) => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const navigation = useNavigation();
  const { setCartItems } = useContext(FoodieContext)

  useEffect(() => {
    setFeaturedFoods(foods) //gotta change the logic later
  }, [foods]);

  const onPress = (food) => {
    navigation.navigate("foodDescription", { item: food });
  }

  const handleAddToCart = (id) => {
    const item = featuredFoods.find(food => food._id === id)
    setCartItems(prev => {
      const temp = prev.filter(i => i._id !== id)
      const entry = {
        ...item,
        total: item.offerPercent ? item.price - (item.price * item.offerPercent / 100) : item.price,
        quantity: 1,
      }
      return [...temp, entry]
    })
  }

  return (
    <View>
      <FoodTitle Topic="Our" Title="Foods" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: "row", marginTop: "5%" }}>
        {featuredFoods.map((item) => (
          <FoodCard
            key={item._id}
            _id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
            ingredients={item.ingredients}
            offerPercent={item.offerPercent}
            onPress={() => onPress(item)}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Popular;
