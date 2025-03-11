import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CardComponent = ({ foodImage, foodName, price, description, sides }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: foodImage }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.foodName}>{foodName}</Text>
                <Text style={styles.price}>${price}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.sides}>{sides}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        overflow: 'hidden',
        margin: 10,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    
    },
    image: {
        width: '100%',
        height: 200,
    },
    textContainer: {
        padding: 10,
    },
    foodName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#888',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    sides: {
        fontSize: 14,
        color: '#666',
    },
});

export default CardComponent;
