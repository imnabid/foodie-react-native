import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from '../Components/Loginpage';
import SignupPage from '../Components/SignUpPage';

const Stack = createStackNavigator();

const AuthStack = ({navigation}) => {
  return (
   
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={LoginPage}

        />
       <Stack.Screen name="Signup" component={SignupPage} />
       {/* <Stack.Screen name="OtpVerification" component={Otpverificationpage} />
       <Stack.Screen name="Forgetpassword" component={Forgetpasswordpage} />
       <Stack.Screen name="Enteryouremail" component={Enteryouremail} />
       <Stack.Screen name="OtpVerificationPassword" component={Otpverificationforgetpasswordpage} /> */}

      </Stack.Navigator>
    
  )
}

export default AuthStack