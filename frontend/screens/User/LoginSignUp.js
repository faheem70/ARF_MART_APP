import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Pressable, Modal, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../../actions/userAction';
//import PhoneSignIn from './PhoneSignIn';
//import GoogleLogin from './GoogleLogin';


const LoginSignUp = ({ navigation }) => {
    const dispatch = useDispatch();
    const { error, isAuthenticated } = useSelector((state) => state.user);

    const [activeTab, setActiveTab] = useState('login');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    // const [loginError, setLoginError] = useState(null);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = user;

    const loginSubmit = async () => {


        setLoading(true);
        setModalVisible(true);
        // Clear any previous login errors
        // setLoginError(null);

        try {
            await dispatch(login(loginEmail, loginPassword));
        } catch (error) {
            //setLoginError('Invalid password'); // You can customize the error message

            // Set loading and modalVisible to false after a delay
            setTimeout(() => {
                setLoading(false);
                setModalVisible(false);
                // setLoginError(null); // Clear the error message
            }, 5000); // Adjust the delay time (in milliseconds) as needed
        }

    };

    const registerSubmit = () => {
        // Define error messages


        // Check if name length is less than 4
        if (name.length < 4) {
            Alert.alert('Name must be at least 4 characters long');

        }

        // Check if password is less than 8 characters
        if (password.length < 8) {
            Alert.alert('Password must be at least 8 characters long');
        }

        // Check if @ is present in the email
        if (email.indexOf('@') === -1) {
            Alert.alert('Invalid email address');
        }

        // If there are errors, you can display them to the user or handle them as needed.
        if (error && typeof error === 'object' && Object.keys(error).length > 0) {
            // Handle or display errors
            Alert.alert("User Registration Unsuccessful");
        } else {
            // No errors, proceed with registration
            dispatch(register(user))
                .then(() => {
                    // Registration was successful
                    Alert.alert('Registration Successful', 'You can now log in with your new account.');
                })
                .catch((error) => {
                    // Handle registration error
                    if (error && typeof error === 'object' && Object.keys(error).length > 0) {
                        // Handle or display registration errors
                        Alert.alert('User Registration Unsuccessful');
                    }
                });

        }
    };

    useEffect(() => {
        if (error) {
            // Handle or display the error message
            dispatch(clearErrors());
            setLoading(false); // Set loading to false when an error occurs.
            setModalVisible(false);
        }

        if (isAuthenticated) {
            // Navigate to the next screen after successful login or registration
            navigation.navigate('Main'); // Replace with your desired screen name

        }
    }, [dispatch, error, navigation, isAuthenticated]);

    const handleforgetPassword = () => {
        navigation.navigate('ForgotPassword');
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f8f8f8',
            justifyContent: 'center',
            paddingHorizontal: 20,
            marginBottom: 70
        },
        header: {
            alignItems: 'center',
            marginBottom: 20,
        },
        overlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        headerText: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        tabContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
        },
        tab: {
            flex: 1,
            alignItems: 'center',
            padding: 10,
            borderWidth: 1,
            borderColor: '#ddd',
            backgroundColor: 'white',
            borderRadius: 5,
        },
        tabText: {
            fontWeight: 'bold',
        },
        activeTab: {
            backgroundColor: 'orange',
        },
        activeTabText: {
            color: 'white',
        },
        form: {
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
        input: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            padding: 10,
            marginVertical: 10,
        },
        button: {
            backgroundColor: 'orange',
            borderRadius: 5,
            padding: 15,
            alignItems: 'center',
            marginVertical: 10,
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
        },
        errorMessage: {
            color: 'red',
            textAlign: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{activeTab === 'login' ? 'Login' : 'Register'}</Text>
            </View>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'login' ? styles.activeTab : null]}
                    onPress={() => setActiveTab('login')}
                >
                    <Text style={[styles.tabText, activeTab === 'login' ? styles.activeTabText : null]}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'register' ? styles.activeTab : null]}
                    onPress={() => setActiveTab('register')}
                >
                    <Text style={[styles.tabText, activeTab === 'register' ? styles.activeTabText : null]}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                {activeTab === 'login' ? (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={loginEmail}
                            onChangeText={(text) => setLoginEmail(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            value={loginPassword}
                            onChangeText={(text) => setLoginPassword(text)}
                        />
                        <Pressable>
                            <Text onPress={handleforgetPassword}>forgotPassword ?</Text>
                        </Pressable>
                        <TouchableOpacity style={styles.button} onPress={loginSubmit}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        {error && <Text style={styles.errorMessage}>{error}</Text>}


                    </View>
                ) : (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setUser({ ...user, name: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => setUser({ ...user, email: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setUser({ ...user, password: text })}
                        />
                        <TouchableOpacity style={styles.button} onPress={registerSubmit}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>

                    </View>
                )}
            </View>
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
            >
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="orange" />
                </View>
            </Modal>
        </View>
    );
};

export default LoginSignUp;
