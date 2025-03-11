import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Adminstack from './AdminStack'
import Appstack from './AppStack'
import AuthStack from './AuthStack'
import { FoodieContext } from '../Components/Global'

const AppNav = ({navigation}) => {
    const {user} = useContext(FoodieContext)
  return (
    <NavigationContainer>

      {user && user.isAdmin ? <Adminstack /> : <Appstack />}
    </NavigationContainer>
  )
}

export default AppNav