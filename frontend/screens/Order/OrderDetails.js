import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetails, clearErrors } from '../../actions/orderAction';
import { useNavigation } from '@react-navigation/native';
import Loader from '../layout/Loader/Loader';

const OrderDetails = ({ route }) => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(route.params.orderId));
    }, [dispatch, error, route.params.orderId]);

    return (
        <View style={styles.container}>
            {loading ? (
                <Loader />
            ) : order ? (
                <ScrollView>
                    <Text style={styles.title}>Order #{order._id}</Text>
                    <Text style={styles.sectionTitle}>Shipping Info</Text>
                    <View style={styles.sectionContainer}>
                        <View style={styles.row}>
                            <Text>Name:</Text>
                            <Text style={styles.text}>{order.user ? order.user.name : 'N/A'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Phone:</Text>
                            <Text style={styles.text}>
                                {order.shippingInfo ? order.shippingInfo.phoneNo : 'N/A'}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Address:</Text>
                            <Text style={styles.text}>
                                {order.shippingInfo
                                    ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
                                    : 'N/A'}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.sectionTitle}>Payment</Text>
                    <View style={styles.sectionContainer}>
                        <Text
                            style={[
                                styles.paymentStatus,
                                {
                                    color:
                                        order.paymentInfo && order.paymentInfo.status === 'succeeded'
                                            ? 'green'
                                            : 'red',
                                },
                            ]}
                        >
                            {order.paymentInfo && order.paymentInfo.status === 'succeeded' ? 'PAID' : 'NOT PAID'}
                        </Text>
                        <Text style={styles.text}>Amount: {order.totalPrice ? `₹${order.totalPrice}` : 'N/A'}</Text>
                    </View>
                    <Text style={styles.sectionTitle}>Order Status</Text>
                    <View style={styles.sectionContainer}>
                        <Text
                            style={[
                                styles.orderStatus,
                                {
                                    color: order.orderStatus === 'Delivered' ? 'green' : 'red',
                                },
                            ]}
                        >
                            {order.orderStatus ? order.orderStatus : 'N/A'}
                        </Text>
                    </View>
                    <Text style={styles.sectionTitle}>Order Items:</Text>
                    <View style={styles.sectionContainer}>
                        {order.orderItems ? (
                            order.orderItems.map((item) => (
                                <TouchableOpacity
                                    key={item.product}
                                    onPress={() => {
                                        navigation.navigate('ProductDetails', {
                                            productId: item.product,
                                        });
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.productImage}
                                    />
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <Text style={styles.productDetails}>
                                        {item.quantity} X ₹{item.price} ={' '}
                                        <Text style={styles.productPrice}>
                                            ₹{item.price * item.quantity}
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.text}>No order items available.</Text>
                        )}
                    </View>
                </ScrollView>
            ) : (
                <Text style={styles.text}>No order details available.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    sectionContainer: {
        marginVertical: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
    },
    paymentStatus: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderStatus: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    productDetails: {
        fontSize: 16,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OrderDetails;
