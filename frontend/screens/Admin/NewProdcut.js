import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createProduct } from '../../actions/productAction';
//import { useToast } from 'react-native-toast-message';
import MetaData from '../layout/MetaData';
//import SideBar from './Sidebar';
import { Picker } from '@react-native-picker/picker';

const NewProduct = ({ navigation }) => {
    const dispatch = useDispatch();
    // const alert = useToast();

    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
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

    useEffect(() => {
        if (error) {
            // alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            // alert.success('Product Created Successfully');
            navigation.navigate('AdminDashboard');
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, navigation, success]);

    const createProductSubmitHandler = () => {
        const myForm = new FormData();

        myForm.append('name', name);
        myForm.append('price', price);
        myForm.append('description', description);
        myForm.append('category', category);
        myForm.append('Stock', Stock);

        images.forEach((image, index) => {
            myForm.append(`image${index}`, {
                uri: image,
                name: `image_${index}`,
                type: 'image/jpeg',
            });
        });

        dispatch(createProduct(myForm));
    };

    const createProductImagesChange = (imageUris) => {
        setImages(imageUris);
        setImagesPreview(imageUris);
    };

    return (
        <Fragment>
            <MetaData title="Create Product" />
            <View style={styles.dashboard}>

                <View style={styles.newProductContainer}>
                    <Text style={styles.title}>Create Product</Text>
                    <View style={styles.createProductForm}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Product Name"
                                value={name}
                                onChangeText={(text) => setName(text)}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Price"
                                value={price.toString()}
                                onChangeText={(text) => setPrice(text)}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Product Description"
                                value={description}
                                onChangeText={(text) => setDescription(text)}
                                multiline
                                numberOfLines={3}
                                style={styles.textArea}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Picker
                                selectedValue={category}
                                onValueChange={(value) => setCategory(value)}
                                style={styles.input}
                            >
                                <Picker.Item label="Choose Category" value="" />
                                {categories.map((cate) => (
                                    <Picker.Item key={cate} label={cate} value={cate} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Stock"
                                value={Stock.toString()}
                                onChangeText={(text) => setStock(text)}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.fileInputContainer}>
                            <Button title="Upload Images" onPress={() => handleImageUpload()} />
                        </View>
                        <View style={styles.imageContainer}>
                            {imagesPreview.map((image, index) => (
                                <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
                            ))}
                        </View>
                        <Button
                            title="Create"
                            onPress={createProductSubmitHandler}
                            disabled={loading}
                        />
                    </View>
                </View>
            </View>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    dashboard: {
        flex: 1,
        flexDirection: 'row',
    },
    newProductContainer: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
    },
    createProductForm: {
        marginTop: 20,
    },
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        height: 100,
    },
    fileInputContainer: {
        marginVertical: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imagePreview: {
        width: 100,
        height: 100,
        margin: 5,
    },
});

export default NewProduct;
