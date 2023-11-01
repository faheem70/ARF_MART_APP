import React, { Fragment, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialIcons'; // Replace with the appropriate icon library
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import SideBar from './Sidebar';
import { getAllUsers, clearErrors, deleteUser } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';
import Toast from 'react-native-toast-message'; // Import Toast

const UsersList = ({ navigation }) => {
    const dispatch = useDispatch();

    const { error, users } = useSelector((state) => state.allUsers);

    const {
        error: deleteError,
        isDeleted,
        message,
    } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

    useEffect(() => {
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

        if (deleteError) {
            // Replace the alert with a toast
            Toast.show({
                type: 'error',
                text1: deleteError,
                position: 'top', // You can change the position as needed
                visibilityTime: 4000, // Adjust the time as needed (milliseconds)
            });
            dispatch(clearErrors());
        }

        if (isDeleted) {
            // Replace the alert with a success toast
            Toast.show({
                type: 'success',
                text1: message,
                position: 'top', // You can change the position as needed
                visibilityTime: 4000, // Adjust the time as needed (milliseconds)
            });
            navigation.navigate('/admin/users');
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, error, deleteError, isDeleted, message, navigation]);

    const renderUserItem = ({ item }) => {
        return (
            <View style={styles.userItem}>
                <View style={styles.userInfo}>
                    <Text style={styles.userText}>{item.email}</Text>
                    <Text style={styles.userText}>{item.name}</Text>
                    <Text style={styles.userText}>{item.role}</Text>
                </View>
                <View style={styles.userActions}>
                    <Button
                        title="Edit"
                        onPress={() => navigation.navigate(`/admin/user/${item.id}`)}
                    />
                    <Button title="Delete" onPress={() => deleteUserHandler(item.id)} />
                </View>
            </View>
        );
    };

    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />
            <View style={styles.dashboard}>
                <SideBar />
                <View style={styles.productListContainer}>
                    <Text style={styles.productListHeading}>ALL USERS</Text>
                    <FlatList
                        data={users}
                        keyExtractor={(item) => item.id}
                        renderItem={renderUserItem}
                    />
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
    productListContainer: {
        flex: 2,
        padding: 20,
    },
    productListHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    userInfo: {
        flex: 1,
    },
    userText: {
        fontSize: 16,
        marginBottom: 5,
    },
    userActions: {
        flexDirection: 'row',
    },
};

export default UsersList;
