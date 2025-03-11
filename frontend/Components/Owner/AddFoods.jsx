import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/AntDesign";
import { axiosInstance } from "../axios";
import { FoodieContext } from "../Global";
import AntDesign from '@expo/vector-icons/AntDesign';
import { MultiSelect } from "react-native-element-dropdown";

const Food = ({ route, navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const { setSnackbar, setShowDialog } = useContext(FoodieContext);
  const [sides, setSides] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  

  useEffect(() => {
    fetchFoodData();
    fetchSidesData();
    fetchDrinksData();
  }, [])



  const fetchSidesData = () => {
    axiosInstance.get("/sides")
      .then((res) => {
        setSides(res.data);
      })
      .catch((error) => console.error("Error fetching sides:", error));

  }

  const fetchDrinksData = () => {
    axiosInstance.get("/drinks")
      .then((res) => {
        setDrinks(res.data);
      })
      .catch((error) => console.error("Error fetching drinks:", error));
  }


  const fetchFoodData = () => {
    axiosInstance.get("/foods")
      .then((res) => {
        console.log('foods in owner site', res.data)
        setFoodItems(res.data); //needs correction later

      })
      .catch((error) => console.error("Error fetching foods:", error));
  };

  const showDialog = (id) => {
    setShowDialog({
      show: true,
      msg: "Are you sure you want to delete this food?",
      callable: () => deleteItem(id)
    })
  }
  const deleteItem = (id) => {
    axiosInstance.delete(`/foods/${id}`)
      .then((res) => {
        // setSnackbar({ show: true, msg: 'Food deleted successfully' })
        console.log(res.data)
        setFoodItems(foodItems.filter((item) => item._id !== id));
      })
      .catch((error) => console.error("Error deleting food:", error));
  };

  const openDetailsModal = (item) => {
    setSelectedFood(item);
    setIsModalVisible(true);
  };

  const handlePercentChange = (val) => {
    setSelectedFood({ ...selectedFood, offerPercent: val });
  }

  const updateFood = async (id) => {

    axiosInstance.put(`/foods/${id}`,
      {
        offerPercent: parseInt(selectedFood.offerPercent),
        sides: selectedSides,
        drinks: selectedDrinks
      })
      .then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          console.log('update completed')
          setFoodItems(prev => {
            return prev.map(item => {
              if (item._id === id) {
                // return { ...item, offerPercent: selectedFood.offerPercent, sides: selectedSides, drinks: selectedDrinks }
                return res.data
              }
              return item
            })
          })
          setSelectedDrinks([])
          setSelectedSides([])
          setIsModalVisible(false)
        }
      })
      .catch((error) => console.error("Error updating food:", error));
  }

  return (
    <View style={{ flex: 1 }}>
      {}
      <View style={{ backgroundColor: "#003366", height: 80, alignItems: 'center', elevation: 3, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Icon name='arrowleft' size={25} color="white" style={{ marginTop: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 20, marginLeft: 70 }}>Foods</Text>
        <TouchableOpacity style={{
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          flexDirection: 'row',
          borderColor: 'white',
          borderWidth: 1, marginTop: 20
        }}
          onPress={() => navigation.navigate("addFoodsForm", { setFoodItems })}>

          <Text style={{ color: 'white', fontSize: 16, marginRight: 5 }}>Add new</Text>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={foodItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openDetailsModal(item)}>
            <View style={{ backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 3 }}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} />
              ) : (
                <View style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15, backgroundColor: 'gray' }} />
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                {
                  item.offerPercent ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ textDecorationLine: 'line-through' }}>Rs.{item.price}</Text>
                      <Text style={{ color: 'green', marginLeft: 10 }}>Rs.{item.price - (item.price * item.offerPercent) / 100}</Text>
                    </View>
                  ) : (
                    <Text style={{ color: 'green' }}>Rs.{item.price}</Text>
                  )
                }
              </View>
              <TouchableOpacity onPress={() => showDialog(item._id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ padding: 20 }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22, backgroundColor: 'transparent' }}>
          <View style={{ margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, minWidth: 250 }}>
            {selectedFood && (
              <View>
                <Text style={{ marginBottom: 5, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{selectedFood.name}</Text>
                <Text>{selectedFood.description}</Text>
                <Text>Offer Percentage </Text>
                <TextInput
                  placeholder="Enter Percentage"
                  style={styles.input}
                  value={selectedFood.offerPercent}
                  onChangeText={val => handlePercentChange(val)}
                  keyboardType='numeric'
                />
                <Text>Sides</Text>
                <CustomMultiSelectComponent data={sides} placeholder='Select Sides' prevSelected={selectedFood.sides} selected={selectedSides} setSelected={setSelectedSides} />
                <Text>Drinks</Text>
                <CustomMultiSelectComponent data={drinks} placeholder='Select Drink' prevSelected={selectedFood.drinks} selected={selectedDrinks} setSelected={setSelectedDrinks} />
              </View>
            )}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={{ backgroundColor: '#52a447', borderRadius: 20, padding: 10, marginTop: 10, elevation: 2 }} onPress={() => updateFood(selectedFood._id)}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 10 }}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#003366', borderRadius: 20, padding: 10, marginTop: 10, elevation: 2 }} onPress={() => setIsModalVisible(false)}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 10 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#003366',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  contentContainer: {
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownScroll: {
    flexGrow: 1,
  },
  dropdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dropdownItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  dropdownItemSelected: {
    backgroundColor: 'gray',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,

  },
  chip: {
    margin: 4,
    backgroundColor: 'gray',
    color: "white"
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003366',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  uploadButton: {
    backgroundColor: '#003366',

  },
  uploadText: {
    fontSize: 16,
    color: "white",
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    marginTop: -5,
    fontSize: 12,
  },
  errorBorder: {
    borderColor: 'red',
  },
});
const CustomMultiSelectComponent = ({ data, placeholder, prevSelected, selected, setSelected }) => {

  useEffect(() => {
    setSelected(() => {
      const temp = prevSelected.map(item => item._id)
      return temp
    })
  }, [])
  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={data}
        labelField="name"
        valueField="_id"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={selected}
        onChange={item => {
          setSelected(item);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};


const styles1 = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
export default Food;