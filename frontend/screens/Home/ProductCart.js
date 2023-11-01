import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../../actions/cartAction';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MAX_NAME_LENGTH = 20; // Adjust this to the desired maximum name length

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const addToCartHandler = () => {
        dispatch(addItemsToCart(product._id, 1));
    };

    const navigateToProductDetail = () => {
        navigation.navigate('ProductDetails', { id: product._id });
    };

    const truncatedName = product.name.length > MAX_NAME_LENGTH
        ? product.name.substring(0, MAX_NAME_LENGTH - 3) + '...'
        : product.name;

    return (
        <TouchableOpacity style={styles.productCard} onPress={navigateToProductDetail}>
            <Image source={{ uri: product.images[0].url }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{truncatedName}</Text>
                <View style={styles.ratingContainer}>
                    <Rating
                        type="star"
                        ratingCount={5}
                        startingValue={product.ratings}
                        imageSize={20}
                        readonly
                        style={styles.rating}
                    />
                    <Text style={styles.productCardSpan}>{`(${product.numOfReviews})`}</Text>
                </View>
                <Text style={styles.productPrice}>{`₹${product.price}`}</Text>
                <View style={styles.addToCartButton}>
                    <Ionicons name="ios-cart" size={24} color="white" style={styles.cartIcon} />
                    <Pressable onPress={addToCartHandler}>
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    productCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 10,
    },
    productImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
    },
    productInfo: {
        flex: 1,
        marginLeft: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    rating: {
        marginRight: 5,
    },
    productCardSpan: {
        color: 'gray',
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    addToCartButton: {
        backgroundColor: 'orange',
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    cartIcon: {
        marginRight: 5,
    },
    addToCartText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ProductCard;
