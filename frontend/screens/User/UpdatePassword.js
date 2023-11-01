import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/userAction';
import Toast from 'react-native-toast-message';
import Loader from '../layout/Loader/Loader';

const UpdatePassword = ({ navigation }) => {
    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const updatePasswordSubmit = () => {
        if (oldPassword.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '') {
            // Display an error message or toast indicating that fields are required.
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error',
                text2: 'All fields are required',
            });
        } else if (newPassword !== confirmPassword) {
            // Display an error message or toast indicating that passwords don't match.
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error',
                text2: 'New password and confirm password do not match',
            });
        } else {
            // Proceed with updating the password.
            const data = {
                oldPassword,
                newPassword,
            };

            dispatch(updatePassword(data));
        }
    };


    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error',
                text2: error,
            });
            dispatch(clearErrors());
        }

        if (isUpdated) {
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Success',
                text2: 'Profile Updated Successfully',
            });
            navigation.navigate('Account');
        }
    }, [dispatch, error, isUpdated, navigation]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#f8f8f8',
            justifyContent: 'center',
        },
        formContainer: {
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            shadowColor: 'black',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 5,
        },
        formText: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
        },
        input: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            padding: 10,
            marginVertical: 10,
        },
        button: {
            backgroundColor: 'blue',
            borderRadius: 5,
            padding: 15,
            alignItems: 'center',
            marginVertical: 10,
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
        },
    });

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <Text style={styles.formText}>Update Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Old Password"
                            secureTextEntry
                            value={oldPassword}
                            onChangeText={(text) => setOldPassword(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                        />
                        <TouchableOpacity style={styles.button} onPress={updatePasswordSubmit}>
                            <Text style={styles.buttonText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Fragment>
    );
};

export default UpdatePassword;
