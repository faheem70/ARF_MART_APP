import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../actions/userAction"
import { clearCartOnLogout } from '../../actions/cartAction';

import axios from 'axios';
import { useRoute } from '@react-navigation/native';
//import { Icon } from 'react-native-paper';
const Profile = ({ navigation, route }) => {

    const userId = route.params.userId;
    console.log("userId", userId);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [userData, setUserData] = useState(null);
    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isAuthenticated === false) {
            navigation.navigate('LoginSignUp'); // Replace 'Login' with your login screen name
        }
    }, [navigation, isAuthenticated]);

    const logoutUser = () => {

        dispatch(logout());
        dispatch(clearCartOnLogout());

    }

    useEffect(() => {
        const handleGetUserData = async () => {
            try {
                const response = await axios.get(`https://arf-backend.onrender.com/api/v1/otplogin/${userId}`);
                const data = response.data;

                if (data.success) {
                    setUserData(data.userData);
                    setResponseMessage(''); // Clear any previous error messages
                } else {
                    setUserData(null);
                    setResponseMessage(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                setUserData(null);
                setResponseMessage('An error occurred');
            }
        };

        handleGetUserData();
    }, [userId]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f3f3f3',
            padding: 16,
        },
        profileCard: {
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 16,
            elevation: 3, // Material Design elevation
            marginBottom: 16,
        },
        profileImage: {
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: 'center',
            marginBottom: 12,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 16,
        },
        profileInfo: {
            marginBottom: 12,
        },
        profileInfoLabel: {
            fontWeight: 'bold',
        },
        actionButton: {
            backgroundColor: 'orange',
            padding: 12,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 16,
        },
        actionButtonText: {
            color: 'white',
            fontSize: 16,
        },
    });


    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <Fragment>
                    {/* Profile Card */}
                    <View style={styles.profileCard}>
                        <Image
                            source={{ uri: user?.avatar?.url }}
                            style={styles.profileImage}
                        />
                        <Text style={styles.sectionTitle}>My Profile</Text>
                            {
                                userData && (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Orders', { userId: userId })}
                                    >
                                        <Text style={styles.actionButton}>My Orders</Text>
                                    </TouchableOpacity>
                                )
                            }


                            {userData && (
                                <View>
                                    <Text>User ID: {userData.uid}</Text>
                                    <Text>Phone Number: {userData.phoneNumber}</Text>
                                    <Text>Display Name: {userData.displayName}</Text>
                                    <Text>Email: {userData.email}</Text>
                                </View>
                            )}
                        {!isAuthenticated ? (
                            <TouchableOpacity onPress={() => navigation.navigate('LoginSignUp')}>
                                    <Text style={styles.actionButton}>Add Personal Details</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')}>
                                <Text style={styles.actionButton}>Edit Profile</Text>
                            </TouchableOpacity>
                        )}
                        {isAuthenticated && (
                            <TouchableOpacity onPress={logoutUser} style={{ position: 'absolute', top: 10, right: 10 }}>
                                <Text style={styles.actionButton}>Logout</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Profile Information */}
                    {isAuthenticated && (
                        <View style={styles.profileCard}>
                            <View style={styles.profileInfo}>
                                <Text style={styles.profileInfoLabel}>Full Name</Text>
                                <Text>{user?.name}</Text>
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={styles.profileInfoLabel}>Email</Text>
                                <Text>{user?.email}</Text>
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={styles.profileInfoLabel}>Joined On</Text>
                                <Text>{String(user?.createdAt).substr(0, 10)}</Text>
                            </View>
                        </View>
                    )}

                    {/* Action Buttons */}
                    {isAuthenticated && (
                        <View style={styles.profileCard}>
                            <TouchableOpacity onPress={() => navigation.navigate('UpdatePassword')}>
                                <Text style={styles.actionButton}>Change Password</Text>
                            </TouchableOpacity>
                            {user?.email === 'faheemakhtar19730@gmail.com' && (
                                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                                    <Text style={styles.actionButton}>Dashboard</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </Fragment>
            )}
        </View>
    );
};
export default Profile;
