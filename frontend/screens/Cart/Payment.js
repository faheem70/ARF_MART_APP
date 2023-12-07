import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from "react-native-paper";
import { StyleSheet } from "react-native"; // Import StyleSheet
import { createOrder } from "../../actions/orderAction";

const Payment = ({ navigation, route }) => {
    const [orderInfo, setOrderInfo] = useState(null);
    const isAuthenticatedUser = route.params?.isAuthenticatedUser;
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);
    const userId = route.params?.userId;
    const dispatch = useDispatch();
    console.log(userId);
    const productIds = cartItems.map((cartItem) => cartItem.product);

    const [paymentMethod, setPaymentMethod] = useState("cod"); // Default to Stripe

    const paymentData = {
        amount: Math.round(orderInfo?.totalPrice * 100),
        productId: productIds,
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo?.subtotal,
        taxPrice: orderInfo?.tax,
        shippingPrice: orderInfo?.shippingCharges,
        totalPrice: orderInfo?.totalPrice,
        paidAt: new Date(), // Set to the current date and time
        paymentInfo: {
            id: "COD", // You can use any identifier for COD payments
            status: "Cash On Delivery",
        },
        user: user?._id || userId,
    };

    console.log(order);
    console.log("token", isAuthenticatedUser);

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleCashOnDelivery = async () => {
        try {
            const response = await axios.post(
                "https://arf-backend.onrender.com/api/v1/payment/cod",
                order
            );

            if (response.data.success) {
                console.log("Payment Successful");
                dispatch(createOrder(order));
                navigation.navigate("OrderSuccess", { userId: userId });
            } else {
                console.error("Payment Failed: ", response.data.error);
                Alert.alert("Payment Failed", "An error occurred while processing your payment.");
            }
        } catch (error) {
            console.error("Request Failed: ", error);
            Alert.alert("Error", "An error occurred while processing your request.");
        }
    };

    const handlePlaceOrder = () => {
        if (paymentMethod === "stripe") {
            // Handle Stripe payment as before
            // ...
        } else if (paymentMethod === "cod") {
            handleCashOnDelivery();
        }
    };

    useEffect(() => {
        // Use AsyncStorage correctly by awaiting the result
        const retrieveOrderInfo = async () => {
            try {
                const orderInfoFromStorage = await AsyncStorage.getItem("orderInfo");
                console.log(orderInfoFromStorage);
                if (orderInfoFromStorage) {
                    setOrderInfo(JSON.parse(orderInfoFromStorage));
                }
            } catch (error) {
                // Handle the error
                console.error('Error retrieving orderInfo:', error);
            }
        };

        retrieveOrderInfo();
    }, []);

    useEffect(() => {
        if (error) {
            // Handle your custom error message display here
            // You can use state to manage the error message instead of direct DOM manipulation
            // dispatch(clearErrors());
        }
    }, [error]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment</Text>
            <View style={styles.paymentContainer}>
                <View style={styles.paymentOption}>
                    <RadioButton
                        value="cod"
                        status={paymentMethod === "cod" ? 'checked' : 'unchecked'}
                        onPress={() => handlePaymentMethodChange("cod")}
                        color="#0077c8" // Custom color for the radio button
                    />
                    <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
                </View>
                <View style={styles.paymentOption}>
                    <RadioButton
                        value="stripe"
                        status={paymentMethod === "stripe" ? 'checked' : 'unchecked'}
                        onPress={() => handlePaymentMethodChange("stripe")}
                        color="#0077c8" // Custom color for the radio button
                    />
                    <Text style={styles.paymentOptionText}>Pay with Credit Card</Text>
                </View>
            </View>
            {paymentMethod === "stripe" && (
                <Button
                    title={`Pay - ₹${orderInfo?.totalPrice}`}
                    onPress={handlePlaceOrder}
                    style={styles.button}
                />
            )}
            {paymentMethod === "cod" && (
                <Button
                    title="Place Order"
                    onPress={handlePlaceOrder}
                    style={styles.button}
                />
            )}
            <View>
                <Text id="errorMessage" style={styles.errorMessage}></Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    paymentContainer: {
        marginVertical: 10,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    paymentOptionText: {
        fontSize: 16,
        marginLeft: 10,
    },
    payButton: {
        marginTop: 20,
        backgroundColor: "#0077c8", // Custom color for the button
    },
    placeOrderButton: {
        marginTop: 20,
        backgroundColor: "#0077c8", // Custom color for the button
    },
    errorMessage: {
        color: "red",
    },
});

export default Payment;
