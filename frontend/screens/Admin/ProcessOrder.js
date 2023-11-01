import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import MetaData from '../layout/MetaData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SideBar from './Sidebar';
import { getOrderDetails, clearErrors, updateOrder } from '../../actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useToast } from 'react-native-toast-message';

const ProcessOrder = ({ navigation, route }) => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const [status, setStatus] = useState('');

    const updateOrderSubmitHandler = () => {
        const data = new FormData();
        data.append('status', status);

        dispatch(updateOrder(order._id, data));
    };

    const dispatch = useDispatch();
    const alert = useToast();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success('Order Updated Successfully');
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(route.params.orderId));
    }, [dispatch, alert, error, updateError, isUpdated, route.params.orderId]);

    return (
        <Fragment>
            <MetaData title="Process Order" />
            <View style={styles.dashboard}>
                <SideBar />
                <View style={styles.newProductContainer}>
                    {loading ? (
                        <Loader />
                    ) : (
                        <View
                            style={{
                                display: order.orderStatus === 'Delivered' ? 'none' : 'flex',
                            }}
                        >
                            <View style={styles.confirmshippingArea}>
                                <Text>Shipping Info</Text>
                                <View style={styles.orderDetailsContainerBox}>
                                    <View>
                                        <Text>Name:</Text>
                                        <Text>{order.user && order.user.name}</Text>
                                    </View>
                                    <View>
                                        <Text>Phone:</Text>
                                        <Text>
                                            {order.shippingInfo && order.shippingInfo.phoneNo}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text>Address:</Text>
                                        <Text>
                                            {order.shippingInfo &&
                                                `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                        </Text>
                                    </View>
                                </View>

                                <Text>Payment</Text>
                                <View style={styles.orderDetailsContainerBox}>
                                    <View>
                                        <Text
                                            style={{
                                                color:
                                                    order.paymentInfo && order.paymentInfo.status === 'succeeded'
                                                        ? 'green'
                                                        : 'red',
                                            }}
                                        >
                                            {order.paymentInfo && order.paymentInfo.status === 'succeeded'
                                                ? 'PAID'
                                                : 'NOT PAID'}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text>Amount:</Text>
                                        <Text>{order.totalPrice && order.totalPrice}</Text>
                                    </View>
                                </View>

                                <Text>Order Status</Text>
                                <View style={styles.orderDetailsContainerBox}>
                                    <View>
                                        <Text
                                            style={{
                                                color:
                                                    order.orderStatus && order.orderStatus === 'Delivered'
                                                        ? 'green'
                                                        : 'red',
                                            }}
                                        >
                                            {order.orderStatus && order.orderStatus}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    display: order.orderStatus === 'Delivered' ? 'none' : 'flex',
                                }}
                            >
                                <View style={styles.updateOrderForm}>
                                    <Text>Process Order</Text>
                                    <View>
                                        <FontAwesome />
                                        <TextInput
                                            placeholder="Choose Status"
                                            value={status}
                                            onChangeText={(text) => setStatus(text)}
                                            style={styles.input}
                                        />
                                    </View>
                                    <Button
                                        title="Process"
                                        onPress={updateOrderSubmitHandler}
                                        disabled={loading || status === ''}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
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
    newProductContainer: {
        flex: 1,
        padding: 16,
    },
    confirmshippingArea: {
        marginBottom: 20,
    },
    orderDetailsContainerBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    updateOrderForm: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default ProcessOrder;
