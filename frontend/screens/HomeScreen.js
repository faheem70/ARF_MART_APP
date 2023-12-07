import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
//import { Button } from 'react-native-paper';

const HomeScreen = () => {
    const [keyword, setKeyword] = useState('');
    const navigation = useNavigation();

    const searchSubmitHandler = () => {
        if (keyword.trim()) {
            // Perform your search action or navigation here
            // For example, navigate to a search results screen with the keyword
            navigation.navigate('Products', { keyword });
        }
    };
    return (
        <View style={styles.header}>
            <Image
                source={require('../assets/logo28.svg')} // Replace with your logo source
                style={styles.logo}
            />
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={keyword}
                onChangeText={setKeyword}

            />
            <Ionicons title="Search" onPress={searchSubmitHandler} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#333', // Set the background color as per your design
        padding: 10,
        paddingTop: 10,
    },
    logo: {
        width: 100, // Adjust the logo width as needed
        height: 40, // Adjust the logo height as needed
    },
    searchButton: {


    },
    searchInput: {
        flex: 1,
        backgroundColor: '#fff', // Set the background color of the search bar
        borderRadius: 20, // Adjust the border radius as needed
        paddingLeft: 10,
        marginRight: 10,
    },
});

export default HomeScreen;
