import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { FoodieContext, GlobalButton } from "../Global";
import { Checkbox, Chip, Provider as PaperProvider, Button } from "react-native-paper";
import { useCart } from "react-use-cart";
import { Alert } from "../Global";
import { axiosInstance } from "../axios";


const FoodDescription = ({ route, navigation }) => {
  const theme = {
    colors: {
      primary: "#df2020",
    },
  };
  const { item } = route.params;
  const { cartItems, setCartItems, setShowDialog, user } = useContext(FoodieContext)
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(() => {
    if (item.offerPercent) {
      return item.price - (item.price * item.offerPercent) / 100
    }
    return item.price

  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [sides, setSides] = useState(item.sides);
  const [drinks, setDrinks] = useState(item.drinks);
  const [allergicItems, setAllergicItems] = useState([]);
  const [displayAllergies, setDisplayAllergies] = useState([]);
  const [showAR, setShowAR] = useState(false);
  const initialSelectedSides = sides.reduce((acc, side) => {
    acc[side._id] = false;
    return acc;
  }, {});

  const initialSelectedDrinks = drinks.reduce((acc, drink) => {
    acc[drink._id] = false;
    return acc;
  }, {});

  const [selectedSides, setSelectedSides] = useState(initialSelectedSides);
  const [selectedDrinks, setSelectedDrinks] = useState(initialSelectedDrinks);

  useEffect(() => {
    filterAllergicItems()
  }, [user])

  const filterAllergicItems = () => {
    const allergies = user?.allergies
    const tempAllergicItems = [];
    item?.ingredients?.forEach((ingredient) => {
      if (allergies?.includes(ingredient._id)) {
        tempAllergicItems.push(ingredient);
      }
    })
    setDisplayAllergies(tempAllergicItems);
  }


  useEffect(() => {
    const sidesPrice = sides.reduce((acc, side) => {
      if (selectedSides[side._id]) {
        acc += side.price;
      }
      return acc;
    }, 0);
    const drinksPrice = drinks.reduce((acc, drink) => {
      if (selectedDrinks[drink._id]) {
        acc += drink.price;
      }
      return acc;
    }, 0);
    const itemPrice = item.offerPercent ? item.price - (item.price * item.offerPercent) / 100 : item.price;
    setTotal(itemPrice * quantity + sidesPrice + drinksPrice);
  }, [quantity, selectedSides, selectedDrinks])


  const handleSidesChange = (id) => {
    setSelectedSides((prev) => {
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
  };

  const handleDrinksChange = (id) => {
    setSelectedDrinks((prev) => {
      return {
        ...prev,
        [id]: !prev[id],
      };
    });

  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity == 5) return 5;
      return prevQuantity + 1
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity == 1) return 1;
      return prevQuantity - 1
    });
  };



  const addItemToCart = () => {
    if (allergicItems.length > 0) return setAlertVisible(true);
    return addItemToCartConfirmed();
  };

  const addItemToCartConfirmed = () => {
    const sides_ids = Object.keys(selectedSides).filter(key => selectedSides[key] === true);
    const drinks_ids = Object.keys(selectedDrinks).filter(key => selectedDrinks[key] === true);
    const tempSides = sides.filter(side => sides_ids.includes(side._id));
    const tempDrinks = drinks.filter(drink => drinks_ids.includes(drink._id));
    console.log('selected sides', tempSides)
    const prevItem = cartItems.find((item) => item.id === item._id);
    console.log('prev', prevItem)
    if (prevItem) {
      console.log('item already present');
    }
    console.log('quantities', quantity)
    setCartItems(prev => {
      const temp = prev.filter(i => i._id !== item._id)
      const entry = {
        ...item,
        _id: item._id,
        total: total,
        quantity: quantity,
        selectedSides: tempSides,
        selectedDrinks: tempDrinks,
      }
      return [...temp, entry]
    })
    navigation.navigate("Home");
  }

  return (
    <View>
      <Alert
        visible={alertVisible}
        onCancel={() => setAlertVisible(false)}
        onConfirm={() => {
          setAlertVisible(false);
          addItemToCartConfirmed();
        }}
      />

      <View>
        <View
          style={{
            padding: 25,
            marginTop: 25,
            paddingBottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Home")}
          >
            <Icon name="arrowleft" size={25} color={"#df2020"} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ padding: 25 }}>
          <View>
            <Image
              source={{ uri: `${item.image}` }}
              style={{
                width: 300,
                height: 300,
                alignSelf: "center",
                borderRadius: 50,
              }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
                marginTop: "5%",
                maxWidth: 250,
              }}
            >
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginLeft: "auto",
                marginRight: 15,
                marginTop: "8%",
              }}
            >
              <TouchableOpacity activeOpacity={0.5} onPress={decreaseQuantity}>
                <Icon
                  name="minuscircle"
                  size={18}
                  color="#df2020"
                  style={{ marginRight: 7 }}
                />
              </TouchableOpacity>

              <Text style={{ marginRight: 5 }}>{quantity}</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={increaseQuantity}>
                <Icon
                  name="pluscircle"
                  size={18}
                  color="#df2020"
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems:'center', justifyContent:'space-between', marginTop:10 }}>
            <Text
              style={{
                color: "green",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {item.offerPercent ? (
                <View style={{ flexDirection: "row", }}>
                  <Text style={{ color: "grey", textDecorationLine: "line-through", }}>
                    {" "}
                    Rs.{item.price}
                  </Text>
                  <Text style={{ color: "green", marginLeft: 5 }}>
                    Rs.{item.price - (item.price * item.offerPercent) / 100}
                  </Text>
                </View>
              ) : (
                <Text style={{ color: "green" }}>Rs. {item.price}</Text>
              )}
            </Text>
          </View>
          {user && displayAllergies?.length !== 0 && <View>
            <Text
              style={{
                color: "red",
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              This Food Contains:
            </Text>
            <View style={{ flexDirection: 'row', gap: 5, marginTop: 10 }}>
              {
                displayAllergies.map((ingredient) => (
                  <Chip key={ingredient._id} style={styles.chip} >{ingredient.name}</Chip>
                ))

              }
            </View>
          </View>}
          {!user && <View>
            <Text
              style={{
                color: "red",
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              This Food Contains:
            </Text>
            <View style={{ flexDirection: 'row', gap: 5, marginTop: 10 }}>
              {
                item.ingredients.map((ingredient) => (
                  <Chip key={ingredient._id} style={styles.chip} >{ingredient.name}</Chip>
                ))

              }
            </View>
          </View>}
          <Text
            style={{
              color: "black",
              marginTop: "3%",
              fontSize: 18,
            }}
          >
            {item.description}
          </Text>
          {sides?.length !== 0 ? <View
            style={{ borderTopWidth: 4, borderColor: "gray", marginTop: "5%" }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: "3%",
              }}
            >
              Add Sides
            </Text>
            <View>
              <PaperProvider theme={theme}>
                {sides?.map((side) => (
                  <View
                    key={side._id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      fontSize: 18,
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <Checkbox
                        status={
                          selectedSides[side._id] ? "checked" : "unchecked"
                        }
                        onPress={() => handleSidesChange(side._id)}
                      />
                      <Text style={{ marginLeft: 10 }}>{side.name}</Text>
                    </View>
                    <Text
                      style={{
                        backgroundColor: "white",
                        padding: 5,
                        borderRadius: 5,
                        marginRight: 5,
                        color: "green",
                      }}
                    >
                      Rs. {side.price}
                    </Text>
                  </View>
                ))}
              </PaperProvider>
            </View>
          </View> : null}
          {drinks?.length !== 0 ? <View
            style={{ borderTopWidth: 4, borderColor: "gray", marginTop: "2%" }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: "3%",
              }}
            >
              Add Drinks
            </Text>
            <View>
              <PaperProvider theme={theme}>
                {drinks.map((drink) => (
                  <View
                    key={drink._id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      fontSize: 18,
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <Checkbox
                        status={
                          selectedDrinks[drink._id] ? "checked" : "unchecked"
                        }
                        onPress={() => handleDrinksChange(drink._id)}
                      />
                      <Text style={{ marginLeft: 10 }}>{drink.name}</Text>
                    </View>
                    <Text
                      style={{
                        backgroundColor: "white",
                        padding: 5,
                        borderRadius: 5,
                        marginRight: 5,
                        color: "green",
                      }}
                    >
                      Rs. {drink.price}
                    </Text>
                  </View>
                ))}
              </PaperProvider>
            </View>
          </View> : null}
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: "3%",
              }}
            >
              Total: Rs. {total}
            </Text>
          </View>
          <View
            style={{ borderTopWidth: 4, borderColor: "gray", marginTop: "2%" }}
          >
            <GlobalButton name="Add to Cart" onPress={addItemToCart} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: 'red',
    textAlign: 'center',
    color: 'white'
  },
});
export default FoodDescription;
