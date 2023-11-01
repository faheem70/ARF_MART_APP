import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useToast } from 'react-native-toast-message';

const ResetPassword = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const alert = useToast();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const resetPasswordSubmit = () => {
        const myForm = new FormData();
        myForm.set('password', password);
        myForm.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(route.params.token, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Password Updated Successfully');
            navigation.navigate('Login'); // Navigate to the login screen
        }
    }, [dispatch, error, alert, success, navigation]);

    return (
        <Fragment>
            {loading ? (
                // You can replace this with a loading spinner or component
                <Text>Loading...</Text>
            ) : (
                <Fragment>
                    {/* Your Reset Password UI */}
                    <View>
                        <View>
                            <Text>Update Password</Text>
                            <TextInput
                                style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}
                                placeholder="New Password"
                                secureTextEntry
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <TextInput
                                style={{ border: '1px solid #ccc', padding: 10 }}
                                placeholder="Confirm Password"
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={(text) => setConfirmPassword(text)}
                            />
                            <TouchableOpacity onPress={resetPasswordSubmit}>
                                <Text>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ResetPassword;
