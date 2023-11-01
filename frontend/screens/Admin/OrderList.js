import React, { Fragment, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MetaData from '../layout/MetaData';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SideBar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getAllOrders, clearErrors } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';

const OrderList = ({ navigation }) => {
    const dispatch = useDispatch();

    const { error, orders } = useSelector((state) => state.allOrders);

    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    useEffect(() => {
        if (error) {
            // Handle the error
        }

        if (deleteError) {
            // Handle the delete error
        }

        if (isDeleted) {
            // Handle the successful delete
        }

        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, isDeleted]);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    return (
        <Fragment>
            <MetaData title={`ALL ORDERS - Admin`} />
            <View style={styles.dashboard}>
                <SideBar />
                <View style={styles.productListContainer}>
                    <Text style={styles.productListHeading}>ALL ORDERS</Text>
                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.orderItemContainer}>
                                <View style={styles.orderInfo}>
                                    <Text style={styles.orderId}>{item._id}</Text>
                                    <Text style={styles.orderStatus}>
                                        {item.orderStatus === 'Delivered' ? 'Delivered' : 'Not Delivered'}
                                    </Text>
                                    <Text style={styles.orderQty}>Items Qty: {item.orderItems.length}</Text>
                                    <Text style={styles.orderAmount}>Amount: {item.totalPrice}</Text>
                                </View>
                                <View style={styles.orderActions}>
                                    <TouchableOpacity
                                        style={styles.iconContainer}
                                        onPress={() => navigation.navigate('EditOrder', { orderId: item._id })}
                                    >
                                        <FontAwesome5 />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.iconContainer}
                                        onPress={() => deleteOrderHandler(item._id)}
                                    >
                                        <FontAwesome />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    dashboard: {
        flex: 1,
        flexDirection: 'row',
    },
    productListContainer: {
        flex: 1,
        padding: 16,
    },
    productListHeading: {
        fontSize: 24,
    },
    orderItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    orderInfo: {
        flex: 1,
    },
    orderId: {
        fontSize: 16,
    },
    orderStatus: {
        fontSize: 14,
    },
    orderQty: {
        fontSize: 14,
    },
    orderAmount: {
        fontSize: 14,
    },
    orderActions: {
        flexDirection: 'row',
    },
    iconContainer: {
        marginLeft: 10,
    },
});

export default OrderList;
