import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView, View } from "react-native";
import Homepage from "./Components/Hompage/Homepage";
import Buttonnavbar from "./Components/Buttonnavbar";
import { FoodieContext, GlobalFoodieProvider } from "./Components/Global";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import AppNav from "./routes/AppNav";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator();
const App = ({ navigation }) => {
  const [isOwner, setIsOwner] = useState(false)
  const { showSnackbar, showDialog } = useContext(FoodieContext)
  return (
    <AppNav />
  )
}

// const App = ({ navigation }) => {
//   const [isOwner, setIsOwner] = useState(true)
//   const { showSnackbar, showDialog } = useContext(FoodieContext)

//   if (!isOwner) {
//     return (
//       <NavigationContainer>
//         {showSnackbar.show && <CustomSnackbar />}
//         <View style={{ flex: 1, backgroundColor: "white" }}>
//           <Stack.Navigator>
//             <Stack.Screen
//               name="Home"
//               component={HomeScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="tagScreen"
//               component={TagScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="foodDescription"
//               component={FoodDescription}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="cart"
//               component={Cart}
//               options={{ headerShown: false }}
//             />
//               <Stack.Screen
//               name="checkout"
//               component={Checkout}
//               options={{ headerShown: false }}
//               />
//               <Stack.Screen
//               name="billing address"
//               component={Address}
//               options={{ headerShown: false }}
//               />
//               <Stack.Screen
//               name="My Profile"
//               component={Account}
//               options={{ headerShown: false }}
//               />
//               <Stack.Screen
//               name="pastorderitem"
//               component={PastOrderItem}
//               options={{ headerShown: false }}
//               />
//               <Stack.Screen
//               name="myaddress"
//               component={Myaddress}
//               options={{ headerShown: false }}
//               />

//           </Stack.Navigator>
//         </View>
//       </NavigationContainer>
//     );
//   }
//   return (

//     <NavigationContainer>
//       {showSnackbar.show && <CustomSnackbar />}
//       {showDialog.show && <ConfirmDialog />}
//       <View style={{ flex: 1, backgroundColor: "white" }}>
//         <Stack.Navigator>
//           <Stack.Screen name="orders" component={Orders} options={{ headerShown: false }} />
//           <Stack.Screen
//             name="sidesAndDrinks"
//             component={SidesAndDrinks}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="addFoodsForm"
//             component={AddFoodsForm}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen name="addFoods" component={AddFoods} options={{ headerShown: false }} />
//           <Stack.Screen name="addTags" component={AddTags} options={{ headerShown: false }} />

//         </Stack.Navigator>
//         <OwnerButtonNavabar navigation={navigation} />
//       </View>
//     </NavigationContainer>

//   );
// };

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <ScrollView style={{ padding: 20, backgroundColor: "white", marginTop: 25, paddingTop: 0 }}>
      <Homepage />
    </ScrollView>
    <Buttonnavbar navigation={navigation} />
  </View>
);

const AppSetup = ({ navigation }) => {

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <GlobalFoodieProvider>
          <App navigation={navigation} />
          <Toast />
        </GlobalFoodieProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default AppSetup;
