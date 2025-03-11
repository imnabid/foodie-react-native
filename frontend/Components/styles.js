import { View, Text, StyleSheet } from 'react-native'
import React from 'react'


const text = StyleSheet.create({
    generictype: {
        fontFamily: "Nunito-Bold",
        textAlign: 'center'
    },
    graytext: {
        color: '#8F8989'
    },
    redtext: {
        color: '#df2020'
    },
    whitetext: {
        color: '#ffff'
    },
    type30: {
        fontSize: 30,
    },

    type20: {
        fontSize: 20,
    },


    type18: {
        fontSize: 18,


    },
    type12: {
        fontSize: 12,
    }
})

const button = StyleSheet.create({
    genericbutton: {
        height: 50,
        minWidth: '80%',
        backgroundColor: '#df2020',
        alignItems: 'center',
        justifyContent: 'center'
    },
    borderradius10: {
        borderRadius: 10
    },
    borderradius20: {
        borderRadius: 20
    },
    facebookbutton: {
        height: 50,
        minWidth: '80%',
        backgroundColor: '#0A5CE2',
    },
    googlebutton: {
        height: 50,
        minWidth: '80%',
        backgroundColor: '#3E82F1',
    }
})
const line = StyleSheet.create({
    line: {
        marginTop: '4%',
        height: 2,
        width: '30%',
        backgroundColor: '#8F8989'
    }
})

const textField = StyleSheet.create({
    field: {
       
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        minWidth: '80%',
        height: 50,
        
    }
})
const image = StyleSheet.create({
    loginimage: {
        marginLeft: '4%',
        marginTop: '2%'
    }

});

export default { text, image, line, button, textField }
