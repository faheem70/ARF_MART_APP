import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';
// import { useToast } from 'react-native-toast-message'; // You may need to use a different alert library in React Native
import MetaData from '../layout/MetaData';
import { FlatList } from 'react-native';
import LaunchIcon from 'react-native-vector-icons/AntDesign'; // You can use any suitable icon library
import Loader from '../layout/Loader/Loader';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Button } from 'react-native-elements';


const MyOrders = ({ route }) => {
    const dispatch = useDispatch();
    // const alert = useToast(); // You should replace this with an appropriate alert library for React Native
    const userId = route.params.userId;
    console.log(userId);
    const [userData, setUserData] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const navigation = useNavigation();
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);
    console.log(orders);

    useEffect(() => {
        if (error) {
            // alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, error]);
    useEffect(() => {
        const handleGetUserData = async () => {
            try {
                const response = await axios.get(`https://arf-backend.onrender.com/api/v1/otplogin/${userId}`);
                const data = response.data;

                if (data.success) {
                    setUserData(data.userData);
                    console.log(data.userData);
                    setResponseMessage(''); // Clear any previous error messages
                } else {
                    setUserData(null);
                    setResponseMessage(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                setUserData(null);
                setResponseMessage('An error occurred');
            }
        };

        // Call the function when the component mounts
        handleGetUserData();
    }, [userId]);


    const renderItem = ({ item }) => (
        <View style={styles.orderItem}>

            <Text style={styles.orderID}>Order ID: {item.id}</Text>


            <Text style={styles.amount}>Amount: ₹{item.amount}</Text>
            <Text style={styles.status}>ShippingCharge: {item.taxPrice}</Text>
            <Text style={styles.orderStatus}>Items Status: {item.orderStatus}</Text>

            <FlatList
                data={item.orderItems}
                renderItem={({ item: orderItem }) => (
                    <View style={styles.orderItem}>
                        <Image
                            style={styles.orderItemImage} // Style for the order item image
                            source={{ uri: orderItem.image }} // Assuming 'image' is the URL of the image
                        />
                        <Text style={styles.orderItemName}>{orderItem.name}</Text>
                        <Text style={styles.orderItemQuantity}>Quantity: {orderItem.quantity}</Text>
                        {/* Include more details of the order item as needed */}
                    </View>
                )}
                keyExtractor={(orderItem) => orderItem._id}
            />
            <Button
                title="View Order"
                onPress={() => {
                    // Handle navigation to order details screen
                    navigation.navigate('OrderDetails', { orderId: item.id });
                }}
            />
        </View>
    );

    // Check if 'orders' is defined before mapping over it
    const dataToRender = orders
        ? orders
            .filter((item) => userData?.phoneNumber === item.shippingInfo.phoneNo)// Replace 'phone' with the actual property name in your order object

            .map((item) => ({
                id: item._id,
                amount: item.totalPrice,
                taxPrice: item.taxPrice,
                orderStatus: item.orderStatus,
                user: item.user,
                phoneNo: item.shippingInfo.phoneNo,
                shippingInfo: {
                    address: item.shippingInfo.address,
                    city: item.shippingInfo.city,
                    country: item.shippingInfo.country,
                    name: item.shippingInfo.name,
                    phoneNo: item.shippingInfo.phoneNo,
                    pinCode: item.shippingInfo.pinCode,
                    state: item.shippingInfo.state,
                },
                orderItems: item.orderItems.map((orderItem) => ({
            name: orderItem.name,
                    image: orderItem.image,
                    quantity: orderItem.quantity,
                })),
            }))
        : [];



    return (
        <View style={styles.container}>
            <MetaData title={`${user?.name || 'User'} - Orders`} />
            {loading ? (
                <Loader />
            ) : dataToRender.length === 0 ? (
                <Text style={styles.emptyMessage}>No orders found.</Text>
            ) : (
                <View style={styles.myOrdersPage}>
                    <FlatList
                        data={dataToRender}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                    <Text style={styles.myOrdersHeading}>
                        {`${user?.name || 'User'}'s Orders`}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    myOrdersPage: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    orderItem: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    orderID: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderStatus: {
        backgroundColor: 'red'
    },
    amount: {
        fontSize: 16,
    },
    myOrdersHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    orderItemName: {
        color: 'red'
    }
});

export default MyOrders;
