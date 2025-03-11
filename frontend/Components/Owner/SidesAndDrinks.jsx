import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { axiosInstance } from "../axios";
import axios from "axios";

const SidesAndDrinks = ({ navigation }) => {
    const handleAddItem = () => {
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const itemWithId = { ...newItem, id: "" };
        if (isSides) {
            setSides([...sides, itemWithId]);
        } else {
            setDrinks([...drinks, itemWithId]);
        }
        setNewItem({ id: "", name: "", price: "", image: null });
        setModalVisible(false);
    };

    const handleDeleteItem = (id, type) => {
        if (type === "side") {
            const updatedSides = sides.filter((side) => side.id !== id);
            setSides(updatedSides);
        } else if (type === "drink") {
            const updatedDrinks = drinks.filter((drink) => drink.id !== id);
            setDrinks(updatedDrinks);
        }
    };
    return (
        <View>
            <View
                style={{
                    backgroundColor: "#003366",
                    height: 80,
                    alignItems: "center",
                    elevation: 3,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}
                >
                    <Icon
                        name="arrowleft"
                        size={25}
                        color="white"
                        style={{ marginTop: 20 }}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        color: "#fff",
                        marginTop: 20,
                        marginRight: 100,
                    }}
                >
                    Sides & Drinks
                </Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Sides />
                <Drinks />
            </ScrollView>
        </View>
    );
};


const CustomModal = ({ modalVisible, setModalVisible, callback }) => {
    const [newItem, setNewItem] = useState({ 'name': '', 'price': '' })
    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        const errors = {};
        if (!newItem.name) errors.name = "Item name is required";
        if (!newItem.price) errors.price = "Item price is required";
        return errors;
    };

    const handleCallback = async () => {
        const errors = validateInputs();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        try {
            await callback(newItem.name, newItem.price);
            setModalVisible(false);

        }
        catch {
            alert('Error adding item')
        }
    }

    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                }}
            >
                <View
                    style={{
                        width: 300,
                        padding: 20,
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        elevation: 5,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{ marginLeft: "auto", marginBottom: 10 }}
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    >
                        <Ionicons name="close-circle" size={24} color="red" />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Enter Name"
                        style={{
                            width: "100%",
                            borderWidth: 1,
                            borderColor: errors.name ? "red" : "#ccc",
                            borderRadius: 10,
                            marginBottom: 20,
                            padding: 10,
                        }}
                        value={newItem.name}
                        onChangeText={(text) => {
                            setNewItem({ ...newItem, name: text });
                            if (errors.name) {
                                setErrors({ ...errors, name: "" });
                            }
                        }}
                    />
                    {errors.name && (
                        <Text style={{ color: "red", marginBottom: 10, marginTop: -10 }}>
                            {errors.name}
                        </Text>
                    )}
                    <TextInput
                        placeholder="Enter Price"
                        style={{
                            width: "100%",
                            borderWidth: 1,
                            borderColor: errors.price ? "red" : "#ccc",
                            borderRadius: 10,
                            marginBottom: 20,
                            padding: 10,
                        }}
                        value={newItem.price}
                        onChangeText={(val) => {
                            setNewItem({ ...newItem, price: val });
                            if (errors.price) {
                                setErrors({ ...errors, price: "" });
                            }
                        }}
                        inputMode="numeric"
                    />
                    {errors.price && (
                        <Text style={{ color: "red", marginBottom: 10, marginTop: -10 }}>
                            {errors.price}
                        </Text>
                    )}
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#003366",
                            padding: 8,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            elevation: 3,
                            marginBottom: 10,
                        }}
                        onPress={handleCallback}
                    >
                        <Text style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>
                            Add Item
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}


const Sides = () => {
    const [sides, setSides] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getFoodSides();
    }, [])

    const getFoodSides = async () => {
        axiosInstance.get("/sides")
            .then(res => {
                setSides(res.data)

            })
            .catch(err => {
                console.error(err)
            })
    }

    const addSides = async (name, price) => {
        axiosInstance.post("/sides", { name, price })
            .then(res => {
                console.log(res.data)
                getFoodSides();
            })
            .catch(err => {
                console.error(err)
            })
    }

    const deleteSides = async (id) => {
        axiosInstance.delete(`/sides/${id}`)
            .then(res => {
                console.log(res.data)
                getFoodSides();
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            {modalVisible && <CustomModal {...{ modalVisible, setModalVisible }} callback={addSides} />}
            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", flex: 1 }}>
                        Sides
                    </Text>
                    <TouchableOpacity
                        style={{
                            alignSelf: "center",
                            borderRadius: 15,
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 5,
                            flexDirection: "row",
                            borderColor: "#003366",
                            borderWidth: 1,
                            backgroundColor: "#003366",
                            marginLeft: "auto",
                        }}
                        onPress={() => {
                            setModalVisible(true);
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 16, marginRight: 5 }}>
                            Add new
                        </Text>
                        <Ionicons name="add" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {sides.map((side) => (
                        <View
                            key={side._id}
                            style={{
                                backgroundColor: "#fff",
                                width: 100,
                                padding: 10,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                elevation: 3,
                                marginRight: 10,
                                position: "relative",
                                marginTop: 10,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                                {side.name}
                            </Text>
                            <Text style={{ fontSize: 14, color: "#333" }}>
                                Rs {side.price}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    top: 1,
                                    right: 2,

                                }}
                                onPress={() => deleteSides(side._id)}
                            >
                                <Ionicons name="close-circle" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    )
}

const Drinks = () => {
    const [drinks, setDrinks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getDrinks();
    }, [])

    const getDrinks = async () => {
        axiosInstance.get("/drinks")
            .then(res => {
                setDrinks(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    const addDrinks = async (name, price) => {
        axiosInstance.post("/drinks", { name, price })
            .then(res => {
                console.log(res.data)
                getDrinks();
            })
            .catch(err => {
                console.error(err)
            })
    }

    const deleteDrinks = async (id) => {
        axiosInstance.delete(`/drinks/${id}`)
            .then(res => {
                console.log(res.data)
                getDrinks();
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            {modalVisible && <CustomModal {...{ modalVisible, setModalVisible }} callback={addDrinks} />}
            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", flex: 1 }}>
                        Drinks
                    </Text>
                    <TouchableOpacity
                        style={{
                            alignSelf: "center",
                            borderRadius: 15,
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 5,
                            flexDirection: "row",
                            borderColor: "#003366",
                            borderWidth: 1,
                            backgroundColor: "#003366",
                            marginLeft: "auto",
                        }}
                        onPress={() => {
                            setModalVisible(true);
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 16, marginRight: 5 }}>
                            Add new
                        </Text>
                        <Ionicons name="add" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {drinks.map((drink) => (
                        <View
                            key={drink._id}
                            style={{
                                backgroundColor: "#fff",
                                width: 100,
                                padding: 10,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                elevation: 3,
                                marginRight: 10,
                                position: "relative",
                                marginTop: 10,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                                {drink.name}
                            </Text>
                            <Text style={{ fontSize: 14, color: "#333" }}>
                                Rs {drink.price}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    top: 1,
                                    right: 2,


                                }}
                                onPress={() => deleteDrinks(drink._id)}
                            >
                                <Ionicons name="close-circle" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    )
}

export default SidesAndDrinks;