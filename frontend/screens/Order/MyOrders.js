import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';
// import { useToast } from 'react-native-toast-message'; // You may need to use a different alert library in React Native
import MetaData from '../layout/MetaData';
import { FlatList } from 'react-native';
import LaunchIcon from 'react-native-vector-icons/AntDesign'; // You can use any suitable icon library
import Loader from '../layout/Loader/Loader';
import { useNavigation } from '@react-navigation/native';


const MyOrders = () => {
    const dispatch = useDispatch();
    // const alert = useToast(); // You should replace this with an appropriate alert library for React Native
    const navigation = useNavigation();
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);


    useEffect(() => {
        if (error) {
            // alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, error]);



    const renderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <Text style={styles.orderID}>Order ID: {item.id}</Text>
            <Text style={styles.amount}>Amount: ₹{item.amount}</Text>
            <Text style={styles.status}>Status: {item.taxPrice}</Text>
            <Text style={styles.orderStatus}>Items name: {item.orderStatus}</Text>
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
            <LaunchIcon name="rightcircleo" size={30} color="blue" onPress={() => {
                // Handle navigation to order details screen
                navigation.navigate('OrderDetails', { orderId: item.id });
            }} />
        </View>
    );

    // Check if 'orders' is defined before mapping over it
    const dataToRender = orders ? orders.map(item => ({
        id: item._id,
        amount: item.totalPrice,
        taxPrice: item.taxPrice,
        orderStatus: item.orderStatus,
        // Include the 'image' field if available in 'orderItems'
        orderItems: item.orderItems.map(orderItem => ({
            name: orderItem.name,
            image: orderItem.image, // Assuming 'image' is the URL of the image
            quantity: orderItem.quantity,
            // Include more details of the order item as needed
        })),
    })) : [];



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
