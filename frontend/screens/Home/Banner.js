import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const data = [
    'https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-summer-atmosphere-restaurant-supermarket-vegetable-psd-layered-promotion-background-image_159939.jpg',
    'https://timelinecovers.pro/facebook-cover/download/fruits-decor-facebook-cover.jpg',
    'https://images.template.net/57111/Grocery-Supplies-Facebook-Cover-Template.jpeg',
    'https://timelinecovers.pro/facebook-cover/download/cherry-chocolate-cake-facebook-cover.jpg',
    'https://www.jaindairy.com/wp-content/uploads/2020/06/banner1.jpg',
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
