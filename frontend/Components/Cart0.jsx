import { React, useContext, useState } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Button } from "react-native-paper";
import { FoodieContext, GlobalButton } from "./Global";
import Global from "./Global";
import cart from "./Images/cart.png";

const Cart0 = ({ navigation }) => {
  const { cartItems, setCartItems } = useContext(FoodieContext)


  const checkout = () => {
    navigation.navigate("checkout");
  };
  const navigatetohome = () => {
    navigation.navigate("Home");
  };
  const emptycart = () => {
    navigation.navigate("Home");
  };

  const increaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item._id === id) {
          return {
            ...item,
            quantity: item.quantity !== 5 ? item.quantity + 1 : item.quantity
          }
        }
      })
    )
  }
  const decreaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item._id === id) {
          return {
            ...item,
            quantity: item.quantity !== 0 ? item.quantity - 1 : item.quantity
          }
        }
      })
    )
  }

  if (cartItems.length === 0)
    return (
      <View Style={{ flexGrow: 1 }}>
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              padding: 5,
              marginTop: 25,
              paddingBottom: 0,
            }}
          >
            <TouchableOpacity activeOpacity={0.5} onPress={navigatetohome}>
              <Icon name="close" size={25} color={"#df2020"} />
            </TouchableOpacity>

            <Text
              style={{
                textAlign: "center",
                flex: 1,
                lineHeight: 25,
                fontSize: Global.fontSize.large,
                fontWeight: "bold",
                color: "#df2020",
              }}
            >
              Cart
            </Text>
          </View>

          <Image
            source={cart}
            style={{
              width: 250,
              height: 350,
              resizeMode: "contain",
              alignSelf: "center",
              marginTop: 100,
            }}
          />
          <View style={{ padding: 30, marginTop: "auto" }}>
            <Text
              style={{
                fontSize: Global.fontSize.large,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Add items to start a cart
            </Text>
            <Text
              style={{ fontSize: Global.fontSize.small, textAlign: "center" }}
            >
              Once you add items, your cart wil appear here.
            </Text>
          </View>
          <Button
            onPress={navigatetohome}
            mode="contained"
            style={{
              padding: 10,
              backgroundColor: "#df2020",
            }}
            labelStyle={{ fontSize: Global.fontSize.medium }}
          >
            Start Shopping
          </Button>
        </View>
      </View>
    );

  return (
    <View style={{ backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          padding: 25,
          marginTop: 20,
          paddingBottom: 0,
        }}
      >
        <TouchableOpacity activeOpacity={0.5} onPress={emptycart}>
          <Icon name="close" size={25} color={"#df2020"} />
        </TouchableOpacity>

        <Text
          style={{
            textAlign: "center",
            flex: 1,
            lineHeight: 25,
            fontSize: Global.fontSize.large,
            fontWeight: "bold",
            color: "#df2020",
          }}
        >
          Cart
        </Text>
        <Button
          mode="contained"
          style={{
            backgroundColor: "#df2020",
            marginTop: -10,
            marginLeft: "auto",
          }}
          onPress={() => navigation.navigate("pastorderitem")}
        >
          {" "}
          <Icon
            size={20}
            name="filetext1"
            style={{ backgroundColor: "#df2020" }}
          />{" "}
          Order
        </Button>
      </View>
      <ScrollView style={{ flexGrow: 1, padding: 20 }}>
        <View style={{ marginTop: 5 }}>
          {cartItems.map((item) => (
            <View
              key={item._id}
              style={{
                padding: 10,
                backgroundColor: "#FFE4E4",
                borderRadius: 15,
                marginTop: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  source={{ uri: `${item.image}` }}
                  style={{
                    width: 100,
                    height: 100,
                    marginTop: 30,

                    borderRadius: 25,
                  }}
                />

                <View style={{ marginLeft: "auto" }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => removeItem(item._id)}
                  >
                    <Icon
                      name="closecircle"
                      size={18}
                      color="#df2020"
                      style={{
                        marginLeft: "auto",
                      }}
                    />
                  </TouchableOpacity>

                  <View style={{ padding: 5, width: 220, paddingRight: 7 }}>
                    <Text
                      style={{
                        fontSize: Global.fontSize.small,
                        fontWeight: "900",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text>
                      (Rs {item.price})
                    </Text>
                    {item.selectedSides.length !== 0 ? (
                      <Text style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "700" }}>Sides: </Text>
                        {item.selectedSides.map((side) => (
                          <Text key={side._id}>
                            {side.name} (Rs. {side.price})
                          </Text>
                        ))}
                      </Text>
                    ) : null}
                    {item.selectedDrinks.length !== 0 ? (
                      <Text style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <Text style={{ fontWeight: "700" }}>Drinks: </Text>
                        {item.selectedDrinks.map((drink) => (
                          <Text key={drink._id}>
                            {drink.name} (Rs. {drink.price})
                          </Text>
                        ))}
                      </Text>
                    ) : null}
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: "5%",
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        <Icon
                          name="minuscircle"
                          size={15}
                          color="#df2020"
                          style={{ marginRight: 7 }}
                        />
                      </TouchableOpacity>

                      <Text style={{ marginRight: 5 }}>{item.quantity}</Text>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        <Icon
                          name="pluscircle"
                          size={15}
                          color="#df2020"
                          style={{ marginLeft: 5 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: -10 }}>

                <Text
                  style={{
                    marginLeft: "auto",
                    paddingRight: 10,
                    fontWeight: "bold",
                  }}
                >
                  Rs. {item.total}
                </Text>

              </View>
            </View>
          ))}
          <View
            style={{
              borderTopWidth: 4,
              borderTopColor: "gray",
              marginTop: "5%",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: Global.fontSize.medium,
                fontWeight: "bold",
                marginTop: "2%",
              }}
            >
              Subtotal
            </Text>
            <Text
              style={{
                fontSize: Global.fontSize.medium,
                fontWeight: "bold",
                marginTop: "2%",
                marginLeft: "auto",
              }}
            >
              Rs. dummy1000
            </Text>
          </View>
          <GlobalButton name="Go to checkout" onPress={checkout} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Cart0;
