import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: 'Shipping Details',
            icon: '🚚', // You can use any appropriate icon
        },
        {
            label: 'Confirm Order',
            icon: '✅', // You can use any appropriate icon
        },
        {
            label: 'Payment',
            icon: '💳', // You can use any appropriate icon
        },
    ];

    return (
        <View style={styles.container}>
            {steps.map((item, index) => (
                <View key={index} style={styles.step}>
                    <View style={activeStep >= index ? styles.activeStep : styles.inactiveStep}>
                        <Text style={styles.stepLabel}>{item.icon}</Text>
                        <Text style={styles.stepText}>{item.label}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    step: {
        flex: 1,
        alignItems: 'center',
    },
    activeStep: {
        backgroundColor: 'tomato',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    inactiveStep: {
        backgroundColor: 'rgba(0, 0, 0, 0.649)',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    stepLabel: {
        fontSize: 24,
        color: 'white',
    },
    stepText: {
        fontSize: 14,
        color: 'white',
    },
});

export default CheckoutSteps;
