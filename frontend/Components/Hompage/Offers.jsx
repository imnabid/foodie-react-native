import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { FoodTitle, FoodieContext } from "../Global";
import { FoodCard } from "../Global";
import ipAddress from '../Global'
import { axiosInstance } from "../axios";

const OfferCard = ({ foods }) => {
  const [offers, setOffers] = useState([]);
  const navigation = useNavigation();
  const { setCartItems } = useContext(FoodieContext)

  useEffect(() => {
    filterOffers();
  }, [foods]);

  const filterOffers = () => {
    return setOffers(foods.filter(food => food.offerPercent && food.offerPercent > 0))
  }
  const handleAddToCart = (id) => {
    const item = offers.find(food => food._id === id)
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


  const onPress = (food) => {
    navigation.navigate("foodDescription", { item: food });
  }

  return (
    <View style={{ marginBottom: 20 }}>
      <FoodTitle Topic="Our" Title="Offers" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row", marginTop: "5%" }}
      >
        {offers.map((item) => (
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

export default OfferCard;
