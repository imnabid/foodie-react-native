import React, { useContext } from 'react'

import { createStackNavigator } from "@react-navigation/stack";
import CustomSnackbar from '../Components/CustomSnackbar';
import ConfirmDialog from '../Components/ConfirmDialog';
import Orders from '../Components/Owner/Orders';
import SidesAndDrinks from '../Components/Owner/SidesAndDrinks';
import AddFoodsForm from '../Components/Owner/AddFoodsForm';
import AddTags from '../Components/Owner/AddTags';
import AddFoods from '../Components/Owner/AddFoods';
import { View } from 'react-native';
import { FoodieContext } from '../Components/Global';
import OwnerButtonNavabar from "../Components/Owner/OwnerButtonNavabar";


const Stack = createStackNavigator();
const Adminstack = ({ navigation }) => {

  const { showSnackbar, showDialog } = useContext(FoodieContext)
  return (

    <View style={{ flex: 1, backgroundColor: "white" }}>
      {showSnackbar.show && <CustomSnackbar />}
      {showDialog.show && <ConfirmDialog />}
      <Stack.Navigator>
        <Stack.Screen name="orders" component={Orders} options={{ headerShown: false }} />
        <Stack.Screen
          name="sidesAndDrinks"
          component={SidesAndDrinks}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addFoodsForm"
          component={AddFoodsForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="addFoods" component={AddFoods} options={{ headerShown: false }} />
        <Stack.Screen name="addTags" component={AddTags} options={{ headerShown: false }} />

      </Stack.Navigator>
      <OwnerButtonNavabar navigation={navigation} />
    </View>

  )
}

export default Adminstack