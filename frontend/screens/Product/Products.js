import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
    Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCart'; // Create this component in your project
import Loader from '../layout/Loader/Loader'; // Create this component in your project
import Slider from 'react-native-slider';
import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

const categories = [
    'Electronics',
    'Appliances',
    'Toys',
    'Fashion',
    'Furniture',
    'Grocery',
    'SmartPhones',
];

const Products = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);
    const [priceRange, setPriceRange] = useState([0, 25000]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRatings, setSelectedRatings] = useState(0);
    const [showSidebar, setShowSidebar] = useState(false);

    const keyword = route?.params?.keyword;
    console.log(keyword);

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword, currentPage, priceRange, selectedCategory, selectedRatings));
    }, [dispatch, keyword, currentPage, priceRange, selectedCategory, selectedRatings, error]);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const sidebarWidth = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(sidebarWidth, {
            toValue: showSidebar ? windowWidth * 0.6 : 0,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();
    }, [showSidebar]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={toggleSidebar} style={styles.hamburger}>
                    <AntDesign name="menu-fold" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>PRODUCTS</Text>
            </View>

            <View style={styles.productsContainer}>
                {loading ? (
                    <Loader />
                ) : (
                    <FlatList
                        data={products}
                        keyExtractor={(item) => item?.id?.toString()}
                        renderItem={({ item }) => (
                            <ProductCard product={item} />
                        )}
                    />
                )}
            </View>

            <Animated.View
                style={[
                    styles.sidebar,
                    {
                        width: sidebarWidth,
                    },
                ]}
            >
                <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>

                <Text>Price</Text>
                <Slider
                    style={styles.slider}
                    value={priceRange[0]}
                    onValueChange={(newPriceRange) =>
                        setPriceRange([newPriceRange, priceRange[1]])
                    }
                    minimumValue={0}
                    maximumValue={25000}
                />

                <Text>Categories</Text>
                <View style={styles.categoryContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryButton,
                                {
                                    backgroundColor: category === selectedCategory
                                        ? '#f0f0f0'
                                        : 'white',
                                },
                            ]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    {
                                        color: category === selectedCategory
                                            ? 'black'
                                            : 'grey',
                                    },
                                ]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text>Ratings Above: {selectedRatings}</Text>
                <Slider
                    style={styles.slider}
                    value={selectedRatings}
                    onValueChange={(newRating) => setSelectedRatings(newRating)}
                    minimumValue={0}
                    maximumValue={5}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    hamburger: {
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productsContainer: {
        flex: 1,
        padding: 10,
        marginLeft: 30
    },
    sidebar: {
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        padding: 10,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    slider: {
        width: '100%',
        height: 40,
        marginBottom: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    categoryButton: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 5,
    },
    categoryText: {
        color: 'grey',
    },
});

export default Products;
