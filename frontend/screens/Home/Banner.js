import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const data = [
    'https://sparepartsonline.in/wp-content/uploads/2018/08/mobile-phone-accessories-banner.jpg',
    'https://assets-static.invideo.io/images/origin/Creative_Clothing_Advertisement_Ideas_To_Boost_Sales_revised_3_1_cefa9cda88.png',
    'https://img.freepik.com/free-vector/fashion-template-design_23-2150745900.jpg?w=2000',
    'https://www.heliocentrix.in/wp-content/uploads/2020/05/hp-340-laptop-price-banner.jpg',
    'https://www.boat-lifestyle.com/cdn/shop/files/Wave_Style_Call_WEB_1_1440x.jpg?v=1695129521',
];

const imageLinks = [
    '/category/SmartPhones',
    '/category/Fashion',
    '/category/Fashion',
    '/category/Electronics',
    '/category/Electronics',
];

const Banner = () => {
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {/* Handle navigation here */ }}>
                <Image source={{ uri: item }} style={styles.bannerImage} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={500} // Set your desired width here
                itemWidth={350}   // Set your desired width here
                autoplay={true}
                autoplayInterval={5000}
                loop={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    bannerImage: {
        width: 350,       // Set your desired width here
        height: 150,      // Set your desired height here
        borderRadius: 5,
    },
});

export default Banner;
