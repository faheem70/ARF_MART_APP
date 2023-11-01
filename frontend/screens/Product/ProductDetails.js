import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, Image, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import ReviewCard from './ReviewCard';
import Loader from '../../screens/layout/Loader/Loader';
import MetaData from '../../screens/layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';
import { Rating } from 'react-native-ratings';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { AntDesign } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';

const ProductDetails = ({ route }) => {

    const [showFullDescription, setShowFullDescription] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );

    // console.log(success);

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const increaseQuantity = () => {
        if (product && product.stock && product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (product && product.stock && quantity > 1) {
            const qty = quantity - 1;
            setQuantity(qty);
        }
    };

    const addToCartHandler = () => {
        if (product && product._id && quantity > 0) {
            dispatch(addItemsToCart(route.params.id, quantity));
            Alert.alert("Item Added To Cart");
        }
    };

    const submitReviewToggle = () => {
        setOpen(!open);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.append("rating", rating);
        myForm.append("comment", comment);
        myForm.append("productId", route.params.id);

        console.log(myForm);

        dispatch(newReview(myForm));

        setOpen(false);
    };
    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }

        if (reviewError) {
            dispatch(clearErrors());
        }


        if (success) {
            //  console.log("Success:", success);
            Alert.alert("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        if (route.params.id) {
            dispatch(getProductDetails(route.params.id));
        }
    }, [dispatch, route.params.id, error, reviewError, success]);

    if (!product || !product.description) {
        return null; // or some fallback content if needed
    }

    return (
        <ScrollView>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    {product ? (
                        <MetaData title={"-- ARF MART"} />
                    ) : null}

                    <View style={styles.container}>
                        {product ? (<Carousel
                            data={product.images || []}
                            renderItem={({ item }) => (
                                <Image
                                    source={{ uri: item.url }}
                                    style={styles.carouselImage}
                                />
                            )}
                            sliderWidth={300}
                            itemWidth={300}
                            autoplay={true} // Enable autoplay
                            autoplayInterval={4000}
                            loop={true}
                        />
                        ) : null}

                        <Text style={styles.productName}>{product?.name}</Text>
                        <Text style={styles.productID}>Product # {product?._id}</Text>

                        {product ? (
                            <Rating
                                startingValue={product.ratings}
                                ratingCount={5}
                                imageSize={20}
                                readonly
                                style={styles.rating}
                            />
                        ) : null}

                        {product ? (
                            <Text style={styles.reviewCount}>({product.numOfReviews} Reviews)</Text>
                        ) : null}

                        {product ? (
                            <Text style={styles.price}>{`₹${product.price}`}</Text>
                        ) : null}

                        {product ? (
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={decreaseQuantity}>
                                    <AntDesign name="minus" size={24} color="black" />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{quantity}</Text>
                                <TouchableOpacity onPress={increaseQuantity}>
                                    <AntDesign name="plus" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        ) : null}

                        {product ? (
                            <Button
                                title="Add to Cart"
                                onPress={addToCartHandler}
                                disabled={product.stock < 1}
                                style={styles.addToCartButton}
                            />
                        ) : null}

                        <Text style={styles.status}>
                            Status: <Text style={product.stock < 1 ? styles.statusOutOfStock : styles.statusInStock}>
                                {product.stock < 1 ? 'Out of Stock' : 'In Stock'}
                            </Text>
                        </Text>

                        <Text style={styles.descriptionTitle}>Description:</Text>

                        {product ? (
                            <Text style={styles.descriptionText}>
                                {showFullDescription ? product.description : product.description?.slice(0, 3)}
                            </Text>
                        ) : null}

                        <TouchableOpacity onPress={submitReviewToggle}>
                            <Text style={styles.submitReview}>Submit Review</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={open}
                        onRequestClose={submitReviewToggle}
                    >
                        <View style={styles.modalContainer}>
                            <Rating
                                showRating
                                onFinishRating={(rating) => setRating(rating)}
                                startingValue={rating}
                                style={styles.reviewRating}
                            />
                            <TextInput
                                placeholder="Your review..."
                                onChangeText={(text) => setComment(text)}
                                value={comment}
                                style={styles.reviewInput}
                            />
                            <Button title="Cancel" onPress={submitReviewToggle} style={styles.modalButton} />
                            <Button title="Submit" onPress={reviewSubmitHandler} style={styles.modalButton} />
                        </View>
                    </Modal>

                    <Text style={styles.reviewsTitle}>REVIEWS</Text>

                    {product && product.reviews && product.reviews[0] ? (
                        product.reviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                        ))
                    ) : (
                        <Text style={styles.noReviewsText}>No Reviews Yet</Text>
                    )}

                </Fragment>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    productID: {
        marginTop: 10,
        textAlign: 'center',
    },
    rating: {
        marginTop: 10,
    },
    reviewCount: {
        color: 'gray',
        textAlign: 'center',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    addToCartButton: {
        backgroundColor: 'orange',
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    status: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    carouselImage: {
        width: 300,
        height: 300,
    },
    statusOutOfStock: {
        color: 'red',
    },
    statusInStock: {
        color: 'green',
    },
    descriptionTitle: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    descriptionText: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    submitReview: {
        fontSize: 18,
        color: 'blue',
        textAlign: 'center',
        marginTop: 20,
    },
    modalContainer: {
        padding: 20,
    },
    reviewRating: {
        marginTop: 20,
    },
    reviewInput: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    modalButton: {
        marginTop: 20,
    },
    reviewsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    noReviewsText: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default ProductDetails;
