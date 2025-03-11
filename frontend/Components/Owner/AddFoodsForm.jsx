import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Platform, ScrollView, Switch } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Chip } from 'react-native-paper';
import Icon from "react-native-vector-icons/AntDesign";
import MultiSelectComponent from '../MultiSelectComponent';
import { axiosInstance } from '../axios';
import { FoodieContext } from '../Global';
import { useRoute } from '@react-navigation/native';


const AddFoodsForm = ({ route, navigation }) => {
  const { snackbar, setSnackbar } = useContext(FoodieContext)
  const [imageData, setImageData] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  // const setFoodItems = useRoute().params.setFoodItems
  const setFoodItems = route.params.setFoodItems
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([])

  const [tags, setTags] = useState([]);

  const [sides, setSides] = useState([]);

  const [drinks, setDrinks] = useState([]);
  const [allergies, setAllergies] = useState([]);

  const [newItem, setNewItem] = useState({
    name: 'test',
    price: '300',
    description: 'this is a test description',
    offerPercent: '10'
  });


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);


  useEffect(() => {
    fetchTagData();
    fetchSidesData();
    fetchDrinksData();
    fetAllergyData();
  }, [])

  const fetAllergyData = () => {
    axiosInstance.get("/allergies")
      .then((res) => {
        setAllergies(res.data);
      })
      .catch((error) => console.error("Error fetching allergies:", error));
  }

  const fetchTagData = () => {
    axiosInstance.get("/tags")
      .then((res) => {
        setTags(res.data);
      })
      .catch((error) => console.error("Error fetching tags:", error));

  };

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


  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageData(result.assets[0].uri);
    }
  };



  const handleInputChange = (key, value) => {

    setNewItem(prev => {
      return {
        ...prev,
        [key]: value,
      };

    })
    setErrorMessages(prev => {
      let temp = { ...prev }
      delete temp[key]
      return temp
    });
  };

  const validateInputs = () => {
    const errors = {};
    if (!newItem.name) errors.name = 'Item name is required';
    if (!newItem.price) errors.price = 'Item price is required';
    if (!newItem.description) errors.description = 'Item description is required';
    return errors;
  };

  const handleUpload = () => {
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    // if (!newItem.image) {
    //   alert('Please select an image');
    //   return;
    // }
    let tempItem = { ...newItem };
    if (!tempItem.offerPercent) tempItem.offerPercent = 0;
    let formData = new FormData();
    formData.append('name', tempItem.name);
    formData.append('price', tempItem.price);
    formData.append('description', tempItem.description);
    formData.append('tags', selectedTags.join(','));
    formData.append('sides', selectedSides.join(','));
    formData.append('drinks', selectedDrinks.join(','));
    formData.append('ingredients', selectedAllergies.join(','));
    formData.append('offerPercent', tempItem.offerPercent);
    formData.append('type', 'food')

    formData.append('image', {
      uri: imageData,
      type: 'image/jpeg',
      name: 'image.jpg',
    })

    axiosInstance.post("/upload-food", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {

        console.log(res.data)
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error adding food:", error)
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#003366', height: 80, alignItems: 'center', elevation: 3, flexDirection: "row" }}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Icon name='arrowleft' size={25} color="white" style={{ marginTop: 20, marginLeft: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 20, marginLeft: 120 }}>Add new </Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TextInput
          placeholder="Enter Item Name *"
          style={[styles.input, errorMessages.name && styles.errorBorder]}
          value={newItem.name}
          onChangeText={text => handleInputChange('name', text)}
        />
        {errorMessages.name && <Text style={styles.errorText}>{errorMessages.name}</Text>}

        <TextInput
          placeholder="Enter Item Price *"
          style={[styles.input, errorMessages.price && styles.errorBorder]}
          value={newItem.price}
          onChangeText={text => handleInputChange('price', text)}
          keyboardType='numeric'
        />
        {errorMessages.price && <Text style={styles.errorText}>{errorMessages.price}</Text>}

        <TextInput
          placeholder="Enter Item Description *"
          style={[styles.input, { height: 100, textAlignVertical: 'top' }, errorMessages.description && styles.errorBorder]}
          multiline
          value={newItem.description}
          onChangeText={text => handleInputChange('description', text)}
        />
        {errorMessages.description && <Text style={styles.errorText}>{errorMessages.description}</Text>}

        <TextInput
          placeholder="Enter Offer Percentage"
          style={styles.input}
          value={newItem.offerPercent}
          onChangeText={text => handleInputChange('offerPercent', text)}
          keyboardType='numeric'
        />

        <MultiSelectComponent data={tags} placeholder={'Select Tags'} selected={selectedTags} setSelected={setSelectedTags} />
        <MultiSelectComponent data={sides} placeholder={'Select Sides'} selected={selectedSides} setSelected={setSelectedSides} />
        <MultiSelectComponent data={drinks} placeholder={'Select Drinks'} selected={selectedDrinks} setSelected={setSelectedDrinks} />
        <MultiSelectComponent data={allergies} placeholder={'Select Allergies'} selected={selectedAllergies} setSelected={setSelectedAllergies} />
        {imageData && (
          <Image
            source={{ uri: imageData }}
            style={styles.image}
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={openGallery}
        >
          <Ionicons name="image-outline" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Select Image From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.uploadButton]} onPress={handleUpload}>
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </ScrollView>
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

export default AddFoodsForm;

