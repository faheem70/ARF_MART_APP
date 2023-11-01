import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CartItemCard = ({ item, deleteCartItems }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.cartItemCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemDetails}>
                <TouchableOpacity onPress={() => navigation.navigate('Product', { productId: item.product })}>
                    <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
                <Text>{`Price: ₹${item.price}`}</Text>
                <TouchableOpacity onPress={() => deleteCartItems(item.product)}>
                    <Text style={styles.removeIcon}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    name: {
        fontSize: 16,
    },
    removeIcon: {
        color: 'red', // You can customize the color
        fontSize: 16,
        marginTop: 5,
    },
});

export default CartItemCard;
