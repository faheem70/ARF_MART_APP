import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState('');

    const forgotPasswordSubmit = () => {
        const formData = new FormData();
        formData.append('email', email);

        dispatch(forgotPassword(formData));
    };

    useEffect(() => {
        if (error) {
            // Handle and display error
            dispatch(clearErrors());
        }

        if (message) {
            // Handle and display success message
        }
    }, [dispatch, error, message]);

    return (
        <View style={styles.container}>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <Text style={styles.title}>Forgot Your Password?</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>

                    <TouchableOpacity style={styles.sendButton} onPress={forgotPasswordSubmit}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </Fragment>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        marginTop: 200
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        marginBottom: 20,
    },
    input: {
        padding: 10,
    },
    sendButton: {
        backgroundColor: 'orange',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
    },
    sendButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ForgotPassword;
