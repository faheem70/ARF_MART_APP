import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProduct } from '../../actions/productAction';
import { getAllUsers } from '../../actions/userAction';
import MetaData from '../layout/MetaData';

const Dashboard = ({ navigation }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const users = useSelector((state) => state.allUsers);

    const [outOfStock, setOutOfStock] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllUsers());
    }, [dispatch]);

    useEffect(() => {
        // Calculate the outOfStock count
        if (products && products.length > 0) {
            let count = 0;
            products.forEach((item) => {
                if (item.Stock === 0) {
                    count++;
                }
            });
            setOutOfStock(count);
        }

        // Calculate the totalAmount

    }, [products]);

    return (
        <View style={styles.dashboard}>
            <MetaData title="Dashboard - Admin Panel" />

            <View style={styles.dashboardContainer}>
                <Text style={styles.title}>Dashboard</Text>

                <View style={styles.dashboardSummary}>
                    <View>
                        <Text>
                            Total Amount{' '}
                            <Text style={styles.amount}>₹{totalAmount}</Text>
                        </Text>
                    </View>
                    <View style={styles.dashboardSummaryBox2}>
                        <Text>Product</Text>
                        <Text>{products ? products.length : 0}</Text>
                        <Text>Users</Text>
                        <Text>{users ? users.length : 0}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('ProductList')} // Navigate to Products screen
                >
                    <Text style={styles.buttonText}>Products</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('UserList')} // Navigate to Users screen
                >
                    <Text style={styles.buttonText}>Users</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('NewProduct')} // Navigate to Users screen
                >
                    <Text style={styles.buttonText}>NewProdcut</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('UpdateProduct')} // Navigate to Users screen
                >
                    <Text style={styles.buttonText}>UpdateProduct</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dashboard: {
        flex: 1,
        flexDirection: 'row',
    },
    dashboardContainer: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
    },
    dashboardSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    dashboardSummaryBox2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    amount: {
        color: 'tomato',
    },
    button: {
        backgroundColor: 'blue',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Dashboard;
