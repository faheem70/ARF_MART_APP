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
    'Electronics',
    'Appliances',
    'Toys',
    'Fashion',
    'Furniture',
    'Grocery',
    'SmartPhones',
];

const categoryImages = [
    'https://img.freepik.com/premium-photo/futuristic-gadgets-showcase-lineup-sleek-modern-technological-devices_977107-682.jpg',
    'https://femina.wwmindia.com/content/2020/sep/home-appliances.jpg',
    'https://m.media-amazon.com/images/I/31ZjTsvLhJL._SX300_SY300_QL70_FMwebp_.jpg',
    'https://media.istockphoto.com/id/1207472153/photo/african-american-woman-in-jacket-with-hands-in-pockets-looking-at-camera-isolated-on-turquoise.jpg?s=612x612&w=0&k=20&c=_qp_Bna-Ek8b9jSPi-B2DnkYJRggo-X3rA_wgziL3VU=',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-eEpI-IdCPdUFQacmfofHfuSImCtL4Iz9Z5zihmAgbgQLvl1U4zEVD_iNz9z263qRItU&usqp=CAU',
    'https://s3.amazonaws.com/images.ecwid.com/images/22439182/3382994735.jpg',
    'https://m.media-amazon.com/images/I/41TmlehQnaL._SX300_SY300_QL70_FMwebp_.jpg',
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
                    <View style={styles.loaderContainer}>
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
                                <Text style={styles.homeHeading}>{`${selectedCategory} Products`}</Text>
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
        marginTop: 1
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryCard: {
        alignItems: 'center',
        margin: 10,

    },
    categoryImageContainer: {
        width: 80, // Adjust the width for the image container
        height: 80, // Adjust the height for the image container
        borderRadius: 60, // Make it a circle
        overflow: 'hidden', // Ensure the image stays within the boundaries
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
