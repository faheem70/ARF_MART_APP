import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../config';
import firebase from 'firebase/compat/app';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Otp = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');

    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const navigation = useNavigation();
    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();

        // Append the country code if not present
        const formattedPhoneNumber = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;

        phoneProvider
            .verifyPhoneNumber(formattedPhoneNumber, recaptchaVerifier.current)
            .then((verificationId) => setVerificationId(verificationId))
            .catch((error) => {
                console.error('Error sending verification code:', error);
            });

        setPhoneNumber('');
    };

    const confirmCode = async () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);

        try {
            const userCredential = await firebase.auth().signInWithCredential(credential);
            const user = userCredential.user;
            const uid = user.uid;
            const phoneNumber = user.phoneNumber;
            const displayName = user.displayName;
            const email = user.email;

            console.log('User information:', uid);

            // Send user data to the backend
            await axios.post('https://arf-backend.onrender.com/api/v1/otplogin', {
                uid,
                phoneNumber,
                displayName,
                email,
            });

            console.log('User data saved to the backend');
            navigation.navigate('Shipping', { userId: uid });
        } catch (error) {
            console.error('Error confirming verification code:', error);
        }
    };

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />

            <Text style={styles.otpText}>Login to Verfiy</Text>


            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={setPhoneNumber}
                value={phoneNumber}
            />

            <TouchableOpacity style={styles.button} onPress={sendVerification}>
                <Text style={styles.buttonText}>Send Verification Code</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Verification Code"
                onChangeText={setCode}
                value={code}
            />

            <TouchableOpacity style={styles.button} onPress={confirmCode}>
                <Text style={styles.buttonText}>Confirm Code</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    otpText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Otp;
