import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message'; // Import Toast
import { Button, Text, View, TextInput, Picker, TouchableOpacity } from 'react-native';
import MailOutlineIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PersonIcon from 'react-native-vector-icons/MaterialIcons';
import VerifiedUserIcon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from './Sidebar';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { getUserDetails, updateUser, clearErrors } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';

const UpdateUser = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const { loading, error, user } = useSelector((state) => state.userDetails);

    const {
        loading: updateLoading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.profile);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const userId = route.params.id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (error) {
            // Replace the alert with a toast
            Toast.show({
                type: 'error',
                text1: error,
                position: 'top', // You can change the position as needed
                visibilityTime: 4000, // Adjust the time as needed (milliseconds)
            });
            dispatch(clearErrors());
        }

        if (updateError) {
            // Replace the alert with a toast
            Toast.show({
                type: 'error',
                text1: updateError,
                position: 'top', // You can change the position as needed
                visibilityTime: 4000, // Adjust the time as needed (milliseconds)
            });
            dispatch(clearErrors());
        }

        if (isUpdated) {
            // Replace the alert with a success toast
            Toast.show({
                type: 'success',
                text1: 'User Updated Successfully',
                position: 'top', // You can change the position as needed
                visibilityTime: 4000, // Adjust the time as needed (milliseconds)
            });
            navigation.navigate('/admin/users');
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, error, navigation, isUpdated, updateError, user, userId]);

    const updateUserSubmitHandler = () => {
        const myForm = new FormData();

        myForm.append('name', name);
        myForm.append('email', email);
        myForm.append('role', role);

        dispatch(updateUser(userId, myForm));
    };

    return (
        <Fragment>
            <View style={styles.dashboard}>
                <Sidebar />
                <View style={styles.newProductContainer}>
                    {loading ? (
                        <Loader />
                    ) : (
                        <View style={styles.createProductForm}>
                            <Text style={styles.h1}>Update User</Text>

                            <View style={styles.inputContainer}>
                                <PersonIcon />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    value={name}
                                    onChangeText={(text) => setName(text)}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <MailOutlineIcon />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <VerifiedUserIcon />
                                <Picker
                                    style={styles.picker}
                                    selectedValue={role}
                                    onValueChange={(value) => setRole(value)}
                                >
                                    <Picker.Item label="Choose Role" value="" />
                                    <Picker.Item label="Admin" value="admin" />
                                    <Picker.Item label="User" value="user" />
                                </Picker>
                            </View>

                            <Button
                                style={styles.createProductButton}
                                title="Update"
                                onPress={updateUserSubmitHandler}
                                disabled={updateLoading || role === ''}
                            />
                        </View>
                    )}
                </View>
            </View>
        </Fragment>
    );
};

const styles = {
    dashboard: {
        flex: 1,
        flexDirection: 'row',
    },
    newProductContainer: {
        flex: 2,
    },
    createProductForm: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    h1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        borderBottomWidth: 1,
    },
    picker: {
        flex: 1,
    },
    createProductButton: {
        marginTop: 20,
    },
};

export default UpdateUser;
