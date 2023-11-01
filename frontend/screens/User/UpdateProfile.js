import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updateProfile, loadUser } from '../../actions/userAction';
import ImagePicker from 'react-native-image-picker';

const UpdateProfile = ({ navigation }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const updateProfileSubmit = () => {
        const myForm = new FormData();
        myForm.append('name', name);
        myForm.append('email', email);
        if (avatar) {
            myForm.append('avatar', {
                uri: avatar.uri,
                type: avatar.type,
                name: avatar.fileName,
            });
        }

        dispatch(updateProfile(myForm));
    };

    const selectImage = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker?.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setAvatar(response);
                setAvatarPreview(response.uri);
            }
        });
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            Alert.alert('Error', error); // Show error as an alert
            dispatch(clearErrors());
        }

        if (isUpdated) {
            Alert.alert('Profile Updated Successfully');
            dispatch(loadUser());

            navigation.navigate('Profile'); // Navigate to the account screen

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, navigation, user, isUpdated]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f3f3f3',
            padding: 16,
        },
        updateProfileCard: {
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 16,
            elevation: 3, // Material Design elevation
            marginBottom: 16,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 16,
        },
        input: {
            borderStyle: 'solid',
            borderColor: '#ccc',
            borderWidth: 1,
            padding: 10,
            marginBottom: 10,
        },
        updateButton: {
            backgroundColor: 'orange',
            padding: 12,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 16,
        },
        buttonText: {
            color: 'white',
            fontSize: 16,
        },
    });

    return (
        <Fragment>
            <View style={styles.container}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <Fragment>
                        <View style={styles.updateProfileCard}>
                            <Text style={styles.sectionTitle}>Update Profile</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                value={name}
                                onChangeText={(text) => setName(text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                            {avatarPreview && (
                                <Image source={{ uri: avatarPreview }} style={{ width: 100, height: 100 }} />
                            )}
                            <TouchableOpacity style={styles.updateButton} onPress={selectImage}>
                                <Text style={styles.buttonText}>Select Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.updateButton} onPress={updateProfileSubmit}>
                                <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </Fragment>
                )}
            </View>
        </Fragment>
    );
};

export default UpdateProfile;
