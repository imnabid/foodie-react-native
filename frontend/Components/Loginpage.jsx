import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import TouchableOpacityComponent from './touchablecomponent';
import TextFieldComponent from './textfieldcomponent';
import StyleComponent from './styles';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { axiosInstance } from './axios';
import { AsyncStorage } from 'react-native';
import Global, { FoodieContext } from './Global';
import storage from '../storage';




const { text, button, line, textField, image } = StyleComponent;



const LoginPage = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const { handleLoginLocal } = useContext(FoodieContext)

  useEffect(() => {
    console.log('showPass', showPassword)
  }, [showPassword])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    axiosInstance.post('/login', { email, password })
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.token
          const user = res.data.user
          handleLoginLocal(user, token);
          navigation.navigate('Home')
        }
      })
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Please check your credentials'
        })
        console.log('error', err)
      })
  }


  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          padding: 25,
          marginTop: 20,
          paddingBottom: 0,
        }}
      >
        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('Home')}>
          <Icon name="arrow-left" size={25} color={"#df2020"} />
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
          Sign In
        </Text>

      </View>
      <ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode='interactive' endFillColor={'transparent'}>

        <View>
          <View style={{alignSelf:'center'}}>

          <Image source={require('../images/foodielogo.png')} style={{ marginVertical: '15%' }} />
          </View>
          <Text style={[text.generictype, text.type20, text.graytext]}>New to Foodie?
            <Text onPress={() => { navigation.navigate("Signup") }} style={[text.generictype, text.type20, text.redtext]}> Sign Up</Text>
          </Text>


          <TouchableOpacityComponent
            button={[button.googlebutton, button.borderradius20, { marginTop: '2%' }]}
            image={require('../images/googlelogo.png')}
            imagestyle={image.loginimage}
            texttype={[text.generictype, text.type18, text.whitetext, { marginLeft: '4%', marginTop: '1%' }]}
            text={'Continue with Google'}

          />

        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={line.line} />
          <Text style={[text.generictype, text.type12, text.graytext, { marginTop: '1%', marginRight: '2%', marginLeft: '2%', }]}> or continue with email</Text>
          <View style={line.line} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter your password"
            showPassword={showPassword}
            secureTextEntry={showPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
            <Icon name={showPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: '10%' }}>
          <TouchableOpacityComponent
            onpress={handleLogin}
            button={[button.genericbutton, button.borderradius10]}
            text={'Sign In'}
            texttype={[text.generictype, text.whitetext, text.type18]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  icon: {
    padding: 5,
  },
});

export default LoginPage;
