import React, { useContext, useState } from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FoodieContext } from './Global';
import { axiosInstance } from './axios';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';


function AddressModal({ modalVisible, setModalVisible }) {
  const { user, setUser } = useContext(FoodieContext);
  const [location, setLocation] = useState(user?.address.location);
  const [landmark, setLandmark] = useState(user?.address.landmark);
  const [phoneNumber, setPhonenumber] = useState(user?.phoneNumber);
  const handleAddAddress = () => {
    console.log(location, landmark)
    if (!location) {
      alert('Please enter location');
      return;
    }
    const id = user.id;
    axiosInstance.put(`/users/${id}`, {
      type: "address",
      address: { location, landmark },
      phoneNumber: phoneNumber
    })
      .then((res) => {

        Toast.show({
          type: 'success',
          text1: 'Address Updated',
          text2: 'Your address has been updated successfully'
        })
        setUser(prev => ({ ...prev, address: { ...res.data }, phoneNumber: phoneNumber}))
        setModalVisible(false);
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An error occured while updating your address'
        })
      })
  }
  return (
    <Modal visible={modalVisible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={{ marginLeft: "auto", marginBottom: 10 }} onPress={() => setModalVisible(false)}>
            <Ionicons name="close-circle" size={24} color="red" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={val => setLocation(val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Landmark"
            value={landmark}
            onChangeText={val => setLandmark(val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={val => setPhonenumber(val)}
            keyboardType='numeric'
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
            <Text style={styles.buttonText}>Add Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  container: {

    padding: 25,
    marginBottom: 20,
    marginTop: 50
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 25, padding: 2, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, marginTop: 5
  },
  deleteButton: {
    marginRight: 10, marginLeft: 60
  },
  tagImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 5
  },
  tagText: {
    color: '#000',
    fontSize: 18, marginLeft: 20
  },
  tagList: {
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#003366',
    borderRadius: 15,
    padding: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignSelf: "center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    elevation: 5,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: '#003366',
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
export default AddressModal