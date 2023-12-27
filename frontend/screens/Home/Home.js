import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import Banner from './Banner';
import ProductCard from './ProductCart';
import Carousel from 'react-native-snap-carousel';
import HomeScreen from '../HomeScreen';

const categories = [
    "Vegetables",
    'Fruits',
    "Grocery"
];

const categoryImages = [
    'https://wallpaperaccess.com/full/6835788.jpg',
    'https://st.depositphotos.com/2072495/3764/i/450/depositphotos_37642495-stock-photo-fruits.jpg',
    'https://img2.exportersindia.com/product_images/bc-full/2022/2/5104794/personal-care-products-1501500793-3183216.jpeg',

];

const Home = ({ route }) => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [ratings, setRatings] = useState(0);

    const { products, loading, error } = useSelector((state) => state.products);

    const keyword = route.params?.keyword;

    useEffect(() => {
        if (error) {
            // Handle error
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword, currentPage, price, selectedCategory, ratings));
    }, [dispatch, keyword, currentPage, price, selectedCategory, ratings, error]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const renderCategoryItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                key={categories[index]}
                onPress={() => handleCategoryClick(categories[index])}
                style={styles.categoryCard}
            >
                <View style={styles.categoryImageContainer}>
                    <Image source={{ uri: item }} style={styles.categoryImage} />
                </View>
                <Text style={styles.categoryText}>{categories[index]}</Text>
            </TouchableOpacity>
        );
    };

    return (

        <View style={styles.container}>
            <HomeScreen />
            <ScrollView>
                {loading ? (
                    <View style={[styles.loaderContainer, loading && { marginTop: 300 }]}>
                        <Loader />
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={categories}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => handleCategoryClick(item)}
                                    style={styles.categoryCard}
                                >
                                    <View style={styles.categoryImageContainer}>
                                        <Image source={{ uri: categoryImages[index] }} style={styles.categoryImage} />
                                    </View>
                                    <Text style={styles.categoryText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        {selectedCategory ? (
                            <>
                                    <Text style={styles.homeHeading}>{`${selectedCategory}`}</Text>
                                <View style={styles.productContainer}>
                                    {products &&
                                        products
                                            .filter((product) => product.category === selectedCategory)
                                            .map((product) => (
                                                <ProductCard key={product._id} product={product} />
                                            ))}
                                </View>
                            </>
                        ) : (
                            <>
                                <Banner />
                                        <Text style={styles.heading} >New Year 50% OFF for Every Products</Text>
                                <Text style={styles.homeHeading}>Featured Products</Text>
                                <View style={styles.productContainer}>
                                    {products &&
                                        products.map((product) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                </View>
                            </>
                        )}
                    </>
                )}
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "green",
        marginHorizontal: 10,
        marginVertical: 20,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryCard: {
        alignItems: 'center',
        backgroundColor: '#90EE90',
        margin: 10,

    },
    categoryImageContainer: {
        width: 100, // Adjust the width for the image container
        height: 100, // Adjust the height for the image container
        // Make it a circle

        borderRadius: 8,
        overflow: 'hidden', // Ensure the image stays within the boundaries
        marginHorizontal: 5,
    },
    categoryImage: {
        flex: 1, // Allow the image to stretch within the container
        resizeMode: 'cover',
    },
    categoryText: {
        fontSize: 12,
    },
    homeHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 20,
    },
    productContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;
