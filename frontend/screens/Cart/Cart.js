import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import HomeScreen from '../HomeScreen';

const Cart = ({ navigation }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.user);
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => {
        if (isAuthenticated) {
            navigation.navigate('Shipping');
        } else {
            navigation.navigate("LoginSignUp");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <HomeScreen />
            {cartItems.length === 0 ? (
                <View style={styles.emptyCart}>
                    <Image source={require('../../assets/empty.gif')} style={styles.emptyImage} />
                    <Text style={styles.emptyText}>Your ARF Cart is empty</Text>
                    <Button title="View Products" onPress={() => navigation.navigate('Products')} />
                </View>
            ) : (
                <View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Your Shopping Cart</Text>
                    </View>

                    {cartItems.map((item) => (
                        <View key={item.product} style={styles.cartItem}>
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                            <View style={styles.cartItemDetails}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <View style={styles.cartItemQuantity}>
                                    <Button title="-" onPress={() => decreaseQuantity(item.product, item.quantity)} />
                                    <Text style={styles.quantityText}>{item.quantity}</Text>
                                    <Button title="+" onPress={() => increaseQuantity(item.product, item.quantity, item.stock)} />
                                </View>
                                <Text style={styles.subtotalText}>{`₹${item.price * item.quantity}`}</Text>
                                <Button title="Remove" onPress={() => deleteCartItems(item.product)} />
                            </View>
                        </View>
                    ))}

                    <View style={styles.grossTotal}>
                        <View></View>
                        <View style={styles.grossTotalText}>
                            <Text>Gross Total:</Text>
                            <Text style={styles.totalAmount}>{`₹${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</Text>
                        </View>
                        <View></View>
                    </View>

                    <Button title="Proceed to Checkout" onPress={checkoutHandler} />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        marginTop: 1
    },
    emptyCart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyImage: {
        width: 200,
        height: 200,
    },
    emptyText: {
        fontSize: 20,
        marginVertical: 10,
    },
    header: {
        backgroundColor: '#ff9900',
        padding: 10,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    cartItem: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    cartItemDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
    },
    cartItemQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    subtotalText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    grossTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    grossTotalText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Cart;
