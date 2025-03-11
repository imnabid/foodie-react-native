import { React, createContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import storage from "../storage";

import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export const FoodieContext = createContext();

export const GlobalFoodieProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isOwner, setIsOwner] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [showSnackbar, setShowSnackbar] = useState({
    show: false,
    msg: ''
  });
  const [showDialog, setShowDialog] = useState({
    show: false,
    msg: '',
    callable: null,
  });

  useEffect(() => {
    async function fetchData() {
      let user = await storage.getItem('user')
      const token = await storage.getItem('token')
      user = JSON.parse(user)
      setUser(user)
      setToken(token)
    }
    fetchData();

  }, []);

  useEffect(() => {
    if (user) {
      storage.setItem('user', JSON.stringify(user))
    }
  }, [user])


  useEffect(() => {
    console.log('new cartItems', cartItems)
    // localStorage.setItem('cart', JSON.stringify(cartItems))
    storage.setItem('cart', cartItems)

  }, [cartItems])

  const handleLoginLocal = (user, token) => {
    setUser(user)
    setToken(token)
    storage.setItem('token', token)
    storage.setItem('user', JSON.stringify(user))
    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: 'Welcome to Foodie'
    })
  }
  const handleLogoutLocal = () => {
    storage.removeItem('token')
    storage.removeItem('user')
    setUser(null)
    setToken(null)
    Toast.show({
      type: 'success',
      text1: 'Logout Successful',
    })
  }

  const info = {
    handleLoginLocal,
    handleLogoutLocal,
    cartItems,
    setCartItems,
    isOwner,
    setIsOwner,
    showSnackbar,
    setShowSnackbar,
    showDialog,
    setShowDialog,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    token,
    setToken
  };



  return (
    <FoodieContext.Provider value={info}>{children}</FoodieContext.Provider>
  )
}

export const ipAddress = "http://192.168.1.66:9002"
const Global = {
  fontSize: {
    large: 26,
    medium: 20,
    small: 18,
  },
  color: {
    global: "#df2020",
    backgroundcolor: "#FFE4E4",
    gray: "gray",
  },
};
export const GlobalButton = (props) => {
  return (
    <View>
      <Button
        onPress={props.onPress}
        mode="contained"
        style={{
          padding: 10,
          backgroundColor: Global.color.global,
          marginTop: "10%",
          marginBottom: 200,
        }}
        labelStyle={{ fontSize: Global.fontSize.medium }}
      >
        {props.name}
      </Button>
    </View>
  );
};

export const FoodTitle = (props) => {
  return (
    <View>
      <Text
        style={{
          fontSize: Global.fontSize.large,
          fontWeight: "bold",
          marginTop: "5%",
        }}
      >
        {props.Topic}
        <Text style={{ color: "#df2020" }}> {props.Title}</Text>
      </Text>
    </View>
  );
};

export const FoodCard = (props) => {
  const { _id, name, description, image, price, tags, ingredients,
    offerPercent, onPress, handleAddToCart } = props
  const addToCart = () => {
    handleAddToCart(_id)
    Toast.show({
      type: 'success',
      text1: 'Item added to cart',
      visibilityTime: 2000,
      autoHide: true,
    })

  };
  return (
    <View>
      <View
        style={{
          maxWidth: 120,
          borderRadius: 25,
          borderWidth: 2,
          padding: 6,
          borderColor: "white",
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(props)}>
          <View
            style={{
              backgroundColor: "#f7e5e4",
              borderRadius: 25,
              width: 100,
              height: 90,
              position: "relative",
            }}
          >
            <Image
              source={{ uri: `${image}` }}
              style={{
                width: 95,

                height: 85,

                position: "absolute",
                borderRadius: 25,


              }}
            />
            {offerPercent ? (
              <View
                style={{
                  position: "absolute",
                  borderTopLeftRadius: 25,
                  backgroundColor: "red",
                  paddingVertical: 2,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                }}
              >
                {offerPercent && <Text style={{ color: "white" }}> {offerPercent}% Off</Text>}
              </View>
            ) : null}
            <TouchableOpacity activeOpacity={0.5} onPress={addToCart}>
              <Icon
                name="plus"
                size={15}
                color="black"
                style={{
                  position: "absolute",
                  zIndex: 2,
                  marginTop: 50,
                  right: 0,
                  borderWidth: 1,
                  borderRadius: 25,
                  borderColor: "white",
                  backgroundColor: "white",
                  alignSelf: "center",
                  elevation: 5,
                  padding: 4,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text>{name}</Text>

          {offerPercent ? (
            <View style={{ flexDirection: "row" }}>
              <Text style={{ textDecorationLine: "line-through" }}> Rs.{price}</Text>
              <Text style={{ color: "green", marginLeft: "auto" }}>
                Rs.{price - (price * offerPercent) / 100}
              </Text>
            </View>
          ) : (
            <Text style={{ color: "green" }}>Rs. {price}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const Alert = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}>
        <View style={{
          width: 300,
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'red',
            marginBottom: 10
          }}>Warning</Text>
          <Text style={{
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 20
          }}>You have an allergy to garlic. Are you sure you want to add this item?</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
          }}>
            <TouchableOpacity style={{ flex: 1, marginHorizontal: 5 }} onPress={onCancel}>
              <Text style={{ fontSize: 16, color: 'gray', textAlign: 'center' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, marginHorizontal: 5 }} onPress={onConfirm}>
              <Text style={{ fontSize: 16, color: 'blue', textAlign: 'center' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Global;
