import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import { axiosInstance, baseIP } from '../axios';
import { Button } from 'react-native-paper';
import Global, { FoodieContext } from '../Global';

const Orders = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = React.useState([]);
  const { handleLogoutLocal } = useContext(FoodieContext);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(`ws://${baseIP}:9003`);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const orders = JSON.parse(event.data);
      // console.log('incoming orders', orders)
      setOrders(orders);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const getOrders = () => {
    axiosInstance.get('/orders')
      .then((res) => {
        console.log(res.data)
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order._id !== id));
    axiosInstance.put(`/orders/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const handleLogout = () => {
    handleLogoutLocal();
  }

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
          padding: 15,
          marginBottom: 10,
          borderRadius: 15,
          elevation: 3,
          borderColor: '#CCCCCC',
          borderWidth: 1
        }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => deleteOrder(item._id)}>
          <Icon name="closecircle" size={22} color="#FF6600" style={{ marginLeft: "auto" }} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Date & Time: </Text>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{item.orderedDate}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Full Name: </Text>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{item.user?.fullName}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Phone Number: </Text>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{item.user?.phoneNumber}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Location: </Text>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{item.address?.location} {item.address?.landmark}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            {
              item.order?.map((order) => (
                <View key={order._id} >
                  <Text style={{ fontSize: 16, marginBottom: 5, color: '#c65102', fontWeight: 'bold' }}>{order.food?.name}({order.quantity})</Text>
                  <View style={{ flexDirection: 'row' }}>
                    {
                      order.food?.sides?.map((side) => (

                        <Text key={side._id} style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{side.name} </Text>
                      ))
                    }
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    {
                      order.food?.drinks?.map((drink) => (

                        <Text key={drink._id} style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{drink.name} </Text>
                      ))
                    }
                  </View>
                </View>

              ))
            }

          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Message: </Text>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{item.note}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Price: </Text>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>Rs {item.total}</Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <View style={{ paddingHorizontal: 20, justifyContent: "space-between", alignItems: 'center', backgroundColor: '#003366', height: 80, elevation: 3, flexDirection: "row" }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Orders</Text>
        <Button
          onPress={handleLogout}
          mode="contained"
          style={{
            backgroundColor: "#df2020",
            alignSelf: "center",
          }}
          labelStyle={{ fontSize: Global.fontSize.small }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Icon name="logout" size={15} color={"white"} />
            <Text style={{ color: 'white' }}>Log Out</Text>
          </View>
        </Button>
      </View>
      <View style={{ padding: 25, paddingTop: 0 }}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Orders;
