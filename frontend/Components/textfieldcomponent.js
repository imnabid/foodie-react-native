import { View, Text } from 'react-native'

import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-paper'

const textfield = ({ primarytext, secondarytext, textfieldstyle, securetextentry,icon, onpress, keyboardtype, onchange, outlinecolor, onfocus,activeoutlinecolor, onblur, onsecondarytextpress }) => {
  return (
    <>
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between'
      }}>
        <Text style={{
          marginTop: '2%',
          fontSize: 18,
          fontFamily: 'Nunito-Bold',


        }}> {primarytext}
        </Text>
        <Text onPress={onsecondarytextpress} style={{
          marginTop: '2%',
          fontSize: 14,
          fontFamily: 'Nunito-Bold',

          color: '#8F8989',
        }}> {secondarytext}


        </Text>
      </View>



      <TextInput 
      onChange={onchange}
      keyboardType={keyboardtype}
      mode='outlined' 

      outlineStyle={{ shadowColor: '#000', elevation: 2 }}
      outlineColor={outlinecolor}
      activeOutlineColor={activeoutlinecolor} 
      autoCapitalize='none' 
      autoCorrect={false} 
      secureTextEntry={securetextentry} 
      style={textfieldstyle}
      onFocus={onfocus} 
      onBlur={onblur}
      
      
      
      right={<TextInput.Icon onPress={onpress} icon={icon}/>} />
      




    </>

  )
}

export default textfield