import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
import { Picker } from "@react-native-picker/picker"
const Shipping = ({ navigation }) => {
    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    const shippingSubmit = () => {
        if (phoneNo.length !== 10) {
            Alert.alert('Phone Number should be 10 digits long');
            return;
        }
        dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
        navigation.navigate('ConfirmOrder'); // Use React Navigation for navigation
    };

    return (
        <View style={styles.container}>
            <Text style={styles.shippingHeading}>Shipping Details</Text>

            <View style={styles.formContainer}>
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
                        onChangeText={(text) => setPhoneNo(text)}
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
    submitButton: {
        backgroundColor: 'blue',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Shipping;
