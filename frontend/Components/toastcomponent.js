import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

const toastConfig = {
    customSuccess: ({ text2 }) => (
        <View style={styles.customToast1}>
            <Image
                source={require('../images/check-mark.gif')}
                style={styles.image}
            />
            <Text style={styles.text2}>{text2}</Text>
        </View>
    ),
    customError: ({ text2 }) => (
        <View style={styles.customToast2}>
            <Image
                source={require('../images/cross-mark.gif')}
                style={styles.image}
            />
            <Text style={styles.text2}>{text2}</Text>
        </View>
    ),
    customWarning: ({ text2 }) => (
        <View style={styles.customToast3}>
            <Image
                source={require('../images/warning.gif')}
                style={styles.image}
            />
            <Text style={styles.text2}>{text2}</Text>
        </View>
    ),
};

const styles = StyleSheet.create({
    customToast1: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#e6ffe6',
        borderRadius: 8,
        padding: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 30,
    },
    customToast2: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#FFCCCB',
        borderRadius: 8,
        padding: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 30,
    },
    customToast3: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#FFD580',
        borderRadius: 8,
        padding: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 30,
    },
    image: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    text2: {
        fontSize: 14,
        color: 'black',
    },
});

export default toastConfig;
