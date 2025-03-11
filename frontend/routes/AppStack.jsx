import React, { useContext } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import TagScreen from '../Components/Hompage/TagScreen';
import FoodDescription from '../Components/Hompage/FoodDescription';
import Cart from '../Components/Cart';
import { ScrollView, View } from 'react-native';
import { FoodieContext } from '../Components/Global';
import Buttonnavbar from '../Components/Buttonnavbar';
import Homepage from '../Components/Hompage/Homepage';
import LoginPage from '../Components/Loginpage';
import SignupPage from '../Components/SignUpPage';
// import Checkout from '../Components/Checkout';
import Account from '../Components/Account';
import Checkout from '../Components/Checkout';
import CustomSnackbar from '../Components/CustomSnackbar';
import ConfirmDialog from '../Components/ConfirmDialog';
import OrderHistory from '../Components/Hompage/OrderHistory';
import OtpVerificationpage from '../Components/Otpverificationpage';


const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <ScrollView style={{ padding: 20, backgroundColor: "white", marginTop: 25, paddingTop: 0 }}>
      <Homepage />
    </ScrollView>
    <Buttonnavbar navigation={navigation} />
  </View>
);

const Appstack = ({ navigation }) => {
  const { showDialog } = useContext(FoodieContext)
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {showDialog.show && <ConfirmDialog />}
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="tagScreen"
          component={TagScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="foodDescription"
          component={FoodDescription}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="My Profile"
          component={Account}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}

        />
        <Stack.Screen name="Signup" component={SignupPage} options={{headerShown:false}} />
        <Stack.Screen
          name="checkout"
          component={Checkout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="orderHistory"
          component={OrderHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="otp"
          component={OtpVerificationpage}
          options={{ headerShown: false }}
        />
        {/* 
         */}
        {/* <Stack.Screen name="OtpVerification" component={Otpverificationpage} />
       <Stack.Screen name="Forgetpassword" component={Forgetpasswordpage} />
       <Stack.Screen name="Enteryouremail" component={Enteryouremail} />
       <Stack.Screen name="OtpVerificationPassword" component={Otpverificationforgetpasswordpage} /> */}

      </Stack.Navigator>
    </View>

  )
}

export default Appstack