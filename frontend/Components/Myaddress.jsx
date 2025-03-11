import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import Global from "./Global";

const MyAddress = ({ route, navigation }) => {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch("http://192.168.1.66:9002/addresses");
        const data = await response.json();
        const defaultAddress = data.find((address) => address.isDefault);
        if (defaultAddress) {
          data.forEach((address) => {
            if (address !== defaultAddress && address.isDefault) {
              address.isDefault = false;
            }
          });
        }
        setSavedAddresses(data);
        setDefaultAddress(defaultAddress);
        console.log("saved", savedAddresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        Alert.alert(
          "Error",
          "Failed to fetch addresses. Please try again later."
        );
      }
    };

    fetchAddresses();
  }, []);

  const handleSetDefaultAddress = async (address) => {
    try {
      if (address.isDefault) {
        console.log("Address is already default");
        return;
      }

      const response = await fetch(
        "http://192.168.1.66:9002/set-default-address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: address._id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to set default address");
      }

      const updatedAddresses = savedAddresses.map((addr) => ({
        ...addr,
        isDefault: addr === address,
      }));
      setSavedAddresses(updatedAddresses);
      setDefaultAddress(address);

      console.log("Default address set successfully");
    } catch (error) {
      console.error("Error setting default address:", error);
      Alert.alert(
        "Error",
        "Failed to set default address. Please try again later."
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#f0f0f0",
        padding: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 5,
          marginTop: 25,
          paddingBottom: 0,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrowleft" size={25} color={"#df2020"} />
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
          My Address
        </Text>
      </View>
      <View style={{ marginTop: 5 }}>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("billing address")}>
            <Text style={{color:"#df2020",marginLeft:"auto",}}>
                Add address
            </Text>
        </TouchableOpacity>
       <View style={{ marginTop: 20 }}>
       {savedAddresses.map((address, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSetDefaultAddress(address)}
          >
            <Card
              style={{
                marginBottom: 20,
                elevation: 3,
                borderRadius: 10,
                borderColor: address.isDefault ? "#df2020" : "transparent",
                borderWidth: address.isDefault ? 2 : 0,
              }}
            >
              <Card.Content>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {address.region}, {address.area}
                </Text>
                <Text style={{ fontSize: 14 }}>
                  Mobile: {address.mobileNumber}
                </Text>
                <Text style={{ fontSize: 14 }}>
                  Landmark: {address.landmark}
                </Text>
                {address.isDefault && (
                  <View
                    style={{
                      backgroundColor: "#df2020",
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      alignSelf: "flex-start",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Default
                    </Text>
                  </View>
                )}
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
       </View>
      </View>
    </ScrollView>
  );
};

export default MyAddress;
