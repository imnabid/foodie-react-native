import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import Icon from "react-native-vector-icons/AntDesign";
import Global, { FoodieContext } from '../Global';
import { axiosInstance } from '../axios';

function OrderHistory({ navigation }) {

  const { user } = useContext(FoodieContext)
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      return navigation.navigate('Login')
    }
    fetchOrders();
  }, [])

  const fetchOrders = async () => {
    const id = user.id
    axiosInstance.get(`/orders/${id}`)
      .then(res => {
        setOrders(res.data)
      })
      .catch(err => {
        console.log(err)
      })
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
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Order ID: </Text>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{item._id}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Order Status: </Text>

          <Text style={{ fontSize: 16, marginBottom: 5, color: item.status === 'completed' ? 'green' : 'red' }}>{item.status}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Date & Time: </Text>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>{item.orderedDate}</Text>
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
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333', fontWeight: 'bold' }}>Price: </Text>
          <Text style={{ fontSize: 16, marginBottom: 5, color: '#333333' }}>Rs {item.total}</Text>
        </View>
      </View>
    );
  }
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          padding: 25,
          marginTop: 20,
          paddingBottom: 0,
        }}
      >
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Home')}>
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
          Order History
        </Text>

      </View>
      <View style={{ padding: 25, paddingTop: 0 }}>

        {orders.length !== 0 ? <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
        />
          :
          <Text style={{ textAlign: 'center', fontSize: 20, color: '#333333' }}>No Orders</Text>
        }
      </View>
    </View>
  )
}

export default OrderHistory