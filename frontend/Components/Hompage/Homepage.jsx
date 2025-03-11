import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import FeaturedFoods from "./FeaturedFoods";
import PopularFoods from "./PopularFoods";
import Offers from "./Offers";
import Global, { FoodCard, FoodieContext } from "../Global";
import { axiosInstance } from "../axios";

const Homepage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const {setCartItems} = useContext(FoodieContext);

  useEffect(() => {
    fetchFoodData();
    fetchTagData();

  }, []);

  const fetchFoodData = () => {
    axiosInstance.get("/foods")
      .then((res) => {
        console.log('foods', res.data)
        setFoods(res.data);
      })
      .catch((error) => console.error("Error fetching foods:", error));
  };



  const fetchTagData = () => {
    axiosInstance.get("/tags")
      .then((res) => {
        setTags(res.data);
      })
      .catch((error) => console.error("Error fetching tags:", error));

  };

  const navigateToFoodsByTag = (name, id) => {
    console.log("Selected Tag ID:", name, id);
    navigation.navigate("tagScreen", { tagId: id, tagName: name });
  };




  const renderTagSelection = () => {
    return (
      <FlatList
        data={tags}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToFoodsByTag(item.name, item._id)}>
            <Image
              source={{ uri: item.image }}
              style={{ objectFit: "contain", width: 60, height: 60 }}
            />
            <Text style={{ alignSelf: "center" }}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
          </TouchableOpacity>
        )}
        style={{ marginBottom: 10 }}
      />
    );
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filteredItems = foods.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredFoodItems(filteredItems);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const onPress = (food) => {
    navigation.navigate("foodDescription", { item: food });
  }

  const handleAddToCart = (id) => {
    const item = filteredFoodItems.find(food => food._id === id)
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

  const renderFoodItem = ({ item }) => (
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
  );



  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20, }}
      >
        <View
          style={{
            flex: 1,
            borderRadius: 25,
            backgroundColor: "#f7e3e1",
            paddingLeft: 50,
            paddingRight: 10,
            height: 50,
            marginLeft: 0,
          }}
        >
          <TextInput
            style={{ color: "black", marginTop: 10, width: 290 }}
            placeholder="Search for your meal"
            placeholderTextColor="black"
            onChangeText={handleSearch}
            value={searchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity activeOpacity={0.7} onPress={clearSearch}>
              <Icon
                name="closecircle"
                size={20}
                style={{
                  position: "absolute",
                  right: 10,
                  top: -22,
                  color: (Global.color.global)
                }}
              />
            </TouchableOpacity>
          )}
          <Icon
            name="search1"
            size={20}
            style={{
              position: "absolute",
              left: 20,
              top: 15,
              tintColor: "white",
            }}
          />
        </View>
      </View>
      {searchQuery ? (
        <>
          {filteredFoodItems.length > 0 ? (
            <FlatList
              data={filteredFoodItems}
              keyExtractor={(item) => item._id}
              renderItem={renderFoodItem}
              numColumns={3}
              columnWrapperStyle={{
                flex: 1,
                justifyContent: "flex-start",
                marginBottom: 15,
              }}
              contentContainerStyle={{
                paddingHorizontal: 20,

              }}
              style={{ marginTop: "3%" }}
            />
          ) : (
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "#df2020" }}>
                Sorry, we couldn't find your food
              </Text>
            </View>
          )}
        </>
      ) : (
        <FlatList
          data={[]}
          ListHeaderComponent={
            <>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 26,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#df2020",
                }}
              >
                GETTING HUNGRY?
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                FOODIE{" "}
                <Text
                  style={{ fontSize: 30, color: "#df2020", fontWeight: "bold" }}
                >
                  delivers at
                </Text>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  {" "}
                  your door
                </Text>
              </Text>

              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                {renderTagSelection()}
              </View>

              <PopularFoods foods={foods} />
              <Offers foods={foods}/>
              <FeaturedFoods foods={foods} />
            </>
          }
          renderItem={null}
        />
      )}
    </View>
  );
};

export default Homepage;
