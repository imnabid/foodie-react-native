import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  Pressable,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { Portal, Provider, PaperProvider, Button } from "react-native-paper";
import axios from "axios";
import Global, { FoodieContext } from "./Global";
import { GlobalButton } from "./Global";
import storage from "../storage";
import AddressModal from "./AddressModal";
import Toast from "react-native-toast-message";
import MultiSelectComponent from './MultiSelectComponent';
import { axiosInstance } from "./axios";

const Account = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user, setUser, setCartItems, setToken, setShowDialog } = useContext(FoodieContext)
  const [allergies, setAllergies] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('user', user)
    if (!user) {
      return navigation.navigate('Login')
    }
    setSelectedAllergies(user?.allergies)

  }, []);

  useEffect(() => {
    fetchAllergies()
  }, [])

  const fetchAllergies = async () => {
    axiosInstance.get('/allergies')
      .then(res => {
        setAllergies(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const updateAllergies = async () => {
    axiosInstance.put(`/users/${user.id}`, { type: 'allergies', allergies: selectedAllergies })
      .then(res => {
        console.log(res.data)
        setUser(prev => ({ ...prev, allergies: res.data }))
        Toast.show({
          type: 'success',
          text1: 'Allergies Updated',
          text2: 'Your allergies have been updated successfully'
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const navigatetohome = () => {
    navigation.navigate("Home");
  };

  const logout = () => {
    console.log('logging out')
    storage.removeItem('user')
    storage.removeItem('token')
    setUser(null)
    setToken(null)
    setCartItems([])
    navigatetohome();
    Toast.show({
      type: 'success',
      text1: 'Logout Successful',
    })
  }

  const logoutAlert = () => {
    setShowDialog({
      show: true,
      msg: "Are you sure you want to logout?",
      callable: logout
    })

  };

  return (
    <PaperProvider>
      <Portal>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: 20,
            marginTop: 25,
          }}
        >
          <View style={{ flexDirection: "row", paddingBottom: 0 }}>
            <TouchableOpacity activeOpacity={0.5} onPress={navigatetohome}>
              <Icon name="arrow-left" size={25} color={"#df2020"} />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                flex: 1,
                lineHeight: 25,
                fontSize: 26,
                fontWeight: "bold",
                color: "#df2020",
              }}
            >
              Account
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <Image
                source={{
                  uri:
                    "https://c1.wallpaperflare.com/preview/856/514/335/man-face-human-portrait.jpg",
                }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            </View>
            <Text
              style={{
                textAlign: "center",

                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              {user?.fullName}
            </Text>
            <Text
              style={{
                alignSelf: "center",
                color: "gray",
              }}
            >
              {user?.email}
            </Text>

            <View
              style={{
                backgroundColor: "#F3F3F3",
                padding: 30,
                marginTop: "15%",
                borderRadius: 20,
                paddingTop: 20
              }}
            >
              <View style={{ flexDirection: "row" }}>

                <Text
                  style={{
                    fontSize: Global.fontSize.medium,

                  }}
                >
                  Saved Address
                </Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(true)} style={{
                  alignSelf: "center",
                  marginLeft: "auto"
                }}>
                  <Text
                    style={{
                      fontSize: Global.fontSize.small,
                      color: Global.color.global,

                    }}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
              <View>

                <AddressModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <MultiSelectComponent data={allergies} placeholder="Select Allergies" selected={selectedAllergies} setSelected={setSelectedAllergies} />
              <Button textColor="white" buttonColor="green" mode='contained' onPress={updateAllergies}>Update</Button>
            </View>
            <GlobalButton name="Sign Out" onPress={logoutAlert} />
          </ScrollView>
        </View>


      </Portal>
    </PaperProvider>
  );
};

export default Account;


