import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { renderItem } from "./Orders";

const Homepage = () => {
  return (
    <ScrollView contentContainerStyle={{
      flexGrow: 1,

      padding: 20,
    }}>
      <View style={{
        backgroundColor: "#003366",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 20,
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#fff",
        }}>Welcome, Owner!</Text>
      </View>

      <View style={{ marginBottom: 20, }}>
        <Text style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        }}>Your Statistics</Text>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
          <View
            style={{
              backgroundColor: "#fff",
              width: "48%",
              padding: 20,
              borderRadius: 10,
              justifyContent: "center",
              alignSelf: "center",
              elevation: 3,
              marginTop: 10,
            }}
          >
            <Ionicons name="stats-chart" size={40} color="#003366" />
            <Text style={{
              fontSize: 16,
              marginTop: 10,
              color: "#333",
            }}>Sales</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 5,
              color: "#003366",
            }}>Rs 5,000</Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              width: "48%",
              padding: 20,
              borderRadius: 10,
              justifyContent: "center",
              alignSelf: "center",
              elevation: 3,
              marginTop: 10,
            }}
          >
            <Ionicons name="people" size={40} color="#003366" />
            <Text style={{
              fontSize: 16,
              marginTop: 10,
              color: "#333",
            }}>Customers</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 5,
              color: "#003366",
            }}>250</Text>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: 20, }}>
        <Text style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        }}>Manage Items</Text>
        <TouchableOpacity style={{
          backgroundColor: "#003366",
          padding: 15,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          elevation: 3,
        }}>
          <Text style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>
            Go to Inventory
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Recent Orders
        </Text>
        <View
          style={{
            backgroundColor: "#fff",
            width: "80%",
            padding: 20,
            borderRadius: 10,
            justifyContent: "center",
            alignSelf: "center",
            elevation: 3,
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
            Order #12345
          </Text>
          <Text style={{ fontSize: 14, color: "#666" }}>
            Ram Karki - Rs4500
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            width: "80%",
            padding: 20,
            borderRadius: 10,
            justifyContent: "center",
            alignSelf: "center",
            elevation: 3,
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
            Order #12346
          </Text>
          <Text style={{ fontSize: 14, color: "#666" }}>
            Shiva lal - Rs3000
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};



export default Homepage;
