import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import CheckoutSteps from '../Cart/CheckoutSteps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmOrder = ({ navigation }) => {
    const dispatch = useDispatch();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = async () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        try {
            await AsyncStorage.setItem('orderInfo', JSON.stringify(data));
            // Navigate to the payment screen
            navigation.navigate('Payment');
        } catch (error) {
            // Handle the error
            console.error('Error storing data:', error);
        }
    };

    return (
        <ScrollView>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <View style={styles.confirmOrderPage}>
                <View style={styles.confirmshippingArea}>
                    <Text style={styles.sectionTitle}>Shipping Info</Text>
                    <View style={styles.confirmshippingAreaBox}>
                        <View style={styles.shippingInfoItem}>
                            <Text>Name:</Text>
                            <Text>{user.name}</Text>
                        </View>
                        <View style={styles.shippingInfoItem}>
                            <Text>Phone:</Text>
                            <Text>{shippingInfo.phoneNo}</Text>
                        </View>
                        <View style={styles.shippingInfoItem}>
                            <Text>Address:</Text>
                            <Text>{address}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.confirmCartItems}>
                    <Text style={styles.sectionTitle}>Your Cart Items:</Text>
                    {cartItems.map((item) => (
                        <View key={item.product} style={styles.cartItem}>
                            <Image source={{ uri: item.image }} style={styles.cartItemImage} />
                            <View style={styles.cartItemDetails}>
                                <TouchableOpacity onPress={() => navigation.navigate('Product', { productId: item.product })}>
                                    <Text style={styles.cartItemName}>{item.name}</Text>
                                </TouchableOpacity>
                                <Text>{`${item.quantity} X ₹${item.price} = ₹${item.price * item.quantity}`}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.orderSummary}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.orderSummaryItems}>
                        <View style={styles.orderSummaryItem}>
                            <Text>Subtotal:</Text>
                            <Text>₹{subtotal}</Text>
                        </View>
                        <View style={styles.orderSummaryItem}>
                            <Text>Shipping Charges:</Text>
                            <Text>₹{shippingCharges}</Text>
                        </View>
                        <View style={styles.orderSummaryItem}>
                            <Text>GST:</Text>
                            <Text>₹{tax}</Text>
                        </View>
                    </View>
                    <View style={styles.orderSummaryTotal}>
                        <Text>
                            <Text style={styles.totalLabel}>Total:</Text>
                        </Text>
                        <Text>₹{totalPrice}</Text>
                    </View>
                    <Button title="Proceed To Payment" onPress={proceedToPayment} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    confirmOrderPage: {
        margin: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    confirmshippingArea: {
        marginBottom: 20,
    },
    confirmshippingAreaBox: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    shippingInfoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    confirmCartItems: {
        marginBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cartItemImage: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    cartItemDetails: {
        flex: 1,
    },
    cartItemName: {
        fontSize: 16,
    },
    orderSummary: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },
    orderSummaryItems: {
        marginBottom: 10,
    },
    orderSummaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    orderSummaryTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    totalLabel: {
        fontWeight: 'bold',
    },
});

export default ConfirmOrder;
