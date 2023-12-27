import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
import { Picker } from "@react-native-picker/picker"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Shipping = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const userId = route.params?.userId;
    const isAuthenticatedUser = route.params.isAuthenticatedUser;

    useEffect(() => {
        const loadSavedAddress = async () => {
            try {
                const savedAddress = await AsyncStorage.getItem('userAddress');
                if (savedAddress) {
                    const parsedAddress = JSON.parse(savedAddress);
                    setName(parsedAddress.name);
                    setAddress(parsedAddress.address);
                    setCity(parsedAddress.city);
                    setState(parsedAddress.state);
                    setCountry(parsedAddress.country);
                    setPinCode(parsedAddress.pinCode);
                    setPhoneNo(parsedAddress.phoneNo);
                }
            } catch (error) {
                console.error('Error loading address from AsyncStorage:', error);
            }
        };

        loadSavedAddress();
    }, []);

    const shippingSubmit = async () => {
        if (phoneNo.length !== 13) {
            Alert.alert('Phone Number should be 13 digits long');
            return;
        }

        try {
            await AsyncStorage.setItem('userAddress', JSON.stringify({ name, address, city, state, country, pinCode, phoneNo }));
        } catch (error) {
            console.error('Error saving address to AsyncStorage:', error);
        }

        dispatch(saveShippingInfo({ name, address, city, state, country, pinCode, phoneNo }));
        navigation.navigate('ConfirmOrder', { userId: userId, isAuthenticatedUser: isAuthenticatedUser });
    };

    const resetToDefault = () => {
        Alert.alert(
            'Reset Address',
            'Are you sure you want to reset the address to default values?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => resetAddressToDefault() },
            ]
        );
    };

    const resetAddressToDefault = () => {
        AsyncStorage.removeItem('userAddress');
        setName('');
        setAddress('');
        setCity('');
        setState('');
        setCountry('');
        setPinCode('');
        setPhoneNo('+91');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.shippingHeading}>Shipping Details</Text>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        value={city}
                        onChangeText={(text) => setCity(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Pin Code"
                        value={pinCode}
                        onChangeText={(text) => setPinCode(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={phoneNo}
                        onChangeText={(text) => setPhoneNo(`+91${text}`)}
                        maxLength={10} // Assuming the remaining digits are the actual phone number
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Picker
                        selectedValue={country}
                        onValueChange={(value) => setCountry(value)}
                    >
                        <Picker.Item label="Country" value="Country" />
                        <Picker.Item label="India" value="India" />
                        {/* Map through countries */}
                    </Picker>
                </View>

                {country && (
                    <View style={styles.inputContainer}>
                        <Picker
                            selectedValue={state}
                            onValueChange={(value) => setState(value)}
                        >
                            <Picker.Item label="State" value="State" />
                            <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
                            {/* Map through states based on the selected country */}
                        </Picker>
                    </View>
                )}

                <TouchableOpacity style={styles.resetButton} onPress={resetToDefault}>
                    <Text style={styles.resetText}>Reset to Default</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={shippingSubmit}
                    disabled={!state}
                >
                    <Text style={styles.submitText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    shippingHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    formContainer: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    resetButton: {
        backgroundColor: 'red',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    resetText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: 'orange',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    submitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Shipping;
