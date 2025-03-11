import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Global, { FoodieContext } from "../Global";
import Icon from "react-native-vector-icons/AntDesign";
import { FoodCard } from "../Global";
import { axiosInstance } from "../axios";
const imageURL = "https://static.vecteezy.com/system/resources/previews/037/245/808/non_2x/ai-generated-beautuful-fast-food-background-with-copy-space-free-photo.jpg"

const TagScreen = ({ route, navigation }) => {
  const { tagName, tagId } = route.params;
  const [foodItems, setFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { setCartItems } = useContext(FoodieContext);



  useEffect(() => {
    fetchFoodItems();
  }, []);



  const fetchFoodItems = async () => {
    axiosInstance.get('/tag-foods', {
      params: { id: tagId }
    }).then((res) => {
      setFoodItems(res.data);
      setFilteredFoodItems(res.data);
    }).catch((error) => console.error("Error fetching tag foods:", error));
  };

  const navigateToHome = () => {
    navigation.navigate("Home");
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

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filteredItems = foodItems.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredFoodItems(filteredItems);
    } else {
      setFilteredFoodItems(foodItems);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredFoodItems(foodItems);
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Image
        source={{ uri: imageURL }}
        style={{
          width: "100%",
          height: 200,
          resizeMode: "cover",
          position: "absolute",
        }}
      />
      <TouchableOpacity activeOpacity={0.5} onPress={navigateToHome}>
        <Icon
          name="arrowleft"
          size={25}
          color={"white"}
          style={{ padding: 20, marginTop: 25 }}
        />
      </TouchableOpacity>
      <Text
        style={{
          position: "relative",
          zIndex: 2,
          color: Global.color.global,
          alignSelf: "center",
          fontSize: Global.fontSize.large,
          fontWeight: "bold",
          backgroundColor: "white",
          padding: 8,
          borderTopLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        Choose Your {tagName}
      </Text>
      <View style={{ padding: 25, }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 25,
            backgroundColor: "#f7e3e1",
            paddingLeft: 50,
            paddingRight: 10,
            height: 50,
            marginLeft: 0,
            marginTop: 50,
          }}
        >
          <Icon
            name="search1"
            size={20}
            style={{
              position: "absolute",
              left: 20,
              color: "black",
            }}
          />
          <TextInput
            style={{ color: "black", marginLeft: 40, width: "80%" }}
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
                  color: Global.color.global,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {
        filteredFoodItems.length > 0 ? (<FlatList
          data={filteredFoodItems}
          keyExtractor={(item) => item._id.toString()}
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
          style={{ marginTop: 0 }}
        />
        ) : (
          <Text
            style={{
              marginTop: 55,
              textAlign: "center",
              fontSize: 18,
              color: "red",
            }}
          >
            Sorry, no items found.
          </Text>
        )
      }
    </View>
  );
};

export default TagScreen;
