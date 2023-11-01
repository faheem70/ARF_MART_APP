import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updateProduct, getProductDetails } from '../../actions/productAction';
//import { useAlert } from 'react-alert'; // Replace with your alert library
import MetaData from '../layout/MetaData';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Replace with the appropriate icon library
import SideBar from './Sidebar';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { Toast } from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
const UpdateProduct = ({ route, navigation }) => {
    const dispatch = useDispatch();


    const { error, product } = useSelector((state) => state.productDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.product);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        'Electronics',
        'Appliances',
        'Toys',
        'Fashion',
        'Furniture',
        'Grocery',
        'SmartPhones',
    ];

    const productId = route.params.id;

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
        }
        if (error) {
            Toast.show({
                type: 'error', // or 'success', 'info', 'warning', etc.
                text1: error,
            });
            dispatch(clearErrors());
        }

        if (updateError) {
            Toast.show({
                type: 'error',
                text1: updateError,
            });
            dispatch(clearErrors());
        }

        if (isUpdated) {
            Toast.show({
                type: 'success',
                text1: 'Product Updated Successfully',
            });
            navigation.navigate('ProductList');
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, error, navigation, isUpdated, productId, product, updateError]);

    const updateProductSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set('name', name);
        myForm.set('price', price);
        myForm.set('description', description);
        myForm.set('category', category);
        myForm.set('Stock', Stock);

        images.forEach((image) => {
            myForm.append('images', image);
        });
        dispatch(updateProduct(productId, myForm));
    };

    const updateProductImagesChange = (selectedImages) => {
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        selectedImages.forEach((image) => {
            // Handle image processing here or set it directly
            setImages((old) => [...old, image]);
            setImagesPreview((old) => [...old, image]);
        });
    };

    return (
        <View>
            <MetaData title="Create Product" />
            <View style={styles.container}>
                <SideBar />
                <View style={styles.newProductContainer}>
                    <View style={styles.createProductForm}>
                        <Text style={styles.heading}>Create Product</Text>

                        <View style={styles.inputContainer}>
                            <Icon name="spellcheck" size={20} color="black" />
                            <TextInput
                                style={styles.input}
                                placeholder="Product Name"
                                value={name}
                                onChangeText={(text) => setName(text)}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name="attach-money" size={20} color="black" />
                            <TextInput
                                style={styles.input}
                                placeholder="Price"
                                keyboardType="numeric"
                                value={price}
                                onChangeText={(text) => setPrice(text)}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name="description" size={20} color="black" />
                            <TextInput
                                style={styles.input}
                                placeholder="Product Description"
                                value={description}
                                onChangeText={(text) => setDescription(text)}
                                multiline={true}
                                numberOfLines={4}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="account-tree" size={20} color="black" />
                            <Picker
                                selectedValue={category}
                                onValueChange={(value) => setCategory(value)}>
                                <Picker.Item label="Choose Category" value="" />
                                {categories.map((cate) => (
                                    <Picker.Item key={cate} label={cate} value={cate} />
                                ))}
                            </Picker>
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name="storage" size={20} color="black" />
                            <TextInput
                                style={styles.input}
                                placeholder="Stock"
                                keyboardType="numeric"
                                value={Stock}
                                onChangeText={(text) => setStock(text)}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Button
                                title="Select Images"
                                onPress={() => {
                                    // Add image picker logic here
                                    // updateProductImagesChange(selectedImages);
                                }}
                            />
                        </View>

                        <View style={styles.imageContainer}>
                            {oldImages.map((image, index) => (
                                <Image key={index} source={{ uri: image.url }} style={styles.image} />
                            ))}
                        </View>

                        <View style={styles.imageContainer}>
                            {imagesPreview.map((image, index) => (
                                <Image key={index} source={{ uri: image }} style={styles.image} />
                            ))}
                        </View>

                        <Button
                            title="Create"
                            onPress={updateProductSubmitHandler}
                            disabled={loading ? true : false}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    newProductContainer: {
        flex: 2,
    },
    createProductForm: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        borderBottomWidth: 1,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
};

export default UpdateProduct;
