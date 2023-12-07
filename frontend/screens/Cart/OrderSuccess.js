import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const OrderSuccess = ({ navigation, route }) => {
    const userId = route.params?.userId;
    console.log("userrr", userId);
    return (
        <View style={styles.orderSuccess}>
            <MaterialIcons name="check-circle" size={100} color="green" />
            <Text style={styles.successText}>Your Order has been Placed successfully</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile', { userId: userId })}>
                <Text style={styles.viewOrdersLink}>View Orders</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    orderSuccess: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successText: {
        fontSize: 20,
        marginTop: 20,
    },
    viewOrdersLink: {
        fontSize: 16,
        color: 'blue',
        marginTop: 10,
    },
});

export default OrderSuccess;
