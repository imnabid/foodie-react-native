import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import { axiosInstance } from '../axios';
import { FoodieContext } from '../Global';
const Tags = () => {
  const [tags, setTags] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTag, setNewTag] = useState({ name: '', image: null });

  const navigation = useNavigation();
  const {setShowDialog} = useContext(FoodieContext)

  
  useEffect(() => {
    fetchTagData();
    
  }, [])
  
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.canceled && result.assets.length > 0) {
        setNewTag(prev => ({ ...prev, image: result.assets[0].uri }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  
  const showDialog = (id) => {
    setShowDialog({
      show: true,
      msg: "Are you sure you want to delete this tag?",
      callable:()=>deleteTag(id)
    })
  }

  const fetchTagData = () => {
    axiosInstance.get("/tags")
    .then((res) => {
      setTags(res.data);
    })
      .catch((error) => console.error("Error fetching tags:", error));

  };

  const handleTagUpload = () => {
    console.log(newTag)
    if (!newTag.name || !newTag.image) {
      alert('Please fill all fields');
      return;
    }

    let formData = new FormData();
    formData.append('name', newTag.name);
    formData.append('type', 'tag')
    formData.append('image', {
      uri: newTag.image,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    axiosInstance.post("/tags", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log(res.data)
        setModalVisible(false);
        fetchTagData();
      })
      .catch((error) => {
        console.error("Error adding tag:", error);
        alert('Error adding tag');
      })

  };

  const deleteTag = (id) => {
    setTags(prevTags => prevTags.filter(tag => tag._id !== id));
    axiosInstance.delete(`/tags/${id}`)
      .then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          fetchTagData();
        }
      })
      .catch((error) => {
        console.error("Error deleting tag:", error);
        alert('Error deleting tag');
      })
  };

  return (
    <View >
      <View style={{ backgroundColor: "#003366", height: 80, alignItems: 'center', elevation: 3, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Icon name='arrowleft' size={25} color="white" style={{ marginTop: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 20, marginLeft: 70 }}>Tags</Text>
        <TouchableOpacity style={{ borderRadius: 15, justifyContent: 'center', alignItems: 'center', padding: 5, flexDirection: 'row', borderColor: 'white', borderWidth: 1, marginTop: 20 }} onPress={() => setModalVisible(true)}>
          <Text style={{ color: 'white', fontSize: 16, marginRight: 5 }}>Add new</Text>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>


      <FlatList
        data={tags}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#fff', marginTop: 5, width: 350, padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 3 }}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} />
            ) : (
              <View style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15, backgroundColor: 'gray' }} />
            )}
            <View >
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 150 }}>{item.name}</Text>

            </View>
            {/* <TouchableOpacity onPress={() => deleteTag(item._id)} > */}
            <TouchableOpacity onPress={()=>showDialog(item._id)} >
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.tagList}
      />

      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={{ marginLeft: "auto", marginBottom: 10 }} onPress={() => setModalVisible(false)}>
              <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Tag Name"
              value={newTag.name}
              onChangeText={val => setNewTag(prevTag => ({ ...prevTag, name: val }))}
            />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              <Text style={styles.imagePickerText}>Select Image</Text>
            </TouchableOpacity>
            {newTag.image && (
              <Image source={{ uri: newTag.image }} style={styles.selectedImage} />
            )}
            <TouchableOpacity style={styles.addButton} onPress={handleTagUpload}>
              <Text style={styles.buttonText}>Add Tag</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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

export default Tags;
