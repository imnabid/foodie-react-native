import { View, Text, TouchableOpacity, Image,StyleSheet } from 'react-native'
import React from 'react'

const touchablecomponent = ({button, texttype, text, image, imagestyle, onpress}) => {
    return (

        <TouchableOpacity style={button} onPress={onpress}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}>
                <Image source={image} style={imagestyle} />
                <Text style={texttype}> {text} </Text>
            </View>
        </TouchableOpacity>

    )
}


export default touchablecomponent