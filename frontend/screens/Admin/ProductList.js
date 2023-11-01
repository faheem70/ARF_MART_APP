import React, { Fragment, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAdminProduct, deleteProduct } from '../../actions/productAction';
//import { useToast } from 'react-native-toast-message';

const ProductList = ({ navigation }) => {
    const dispatch = useDispatch();


    const { error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.product);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            // alert.success('Product Deleted Successfully');
            // Redirect to the admin dashboard or another screen
            // navigation.navigate('AdminDashboard');
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProduct());
    }, [dispatch, error, deleteError, isDeleted, navigation]);

    const renderItem = ({ item }) => (
        <View style={styles.productItem}>
            <Text>{item.name}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Stock: {item.stock}</Text>
            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditProduct', { productId: item.id })}
                >
                    <Text>Edit</Text>
                </TouchableOpacity>
                <Button
                    title="Delete"
                    onPress={() => deleteProductHandler(item.id)}
                />
            </View>
        </View>
    );

    return (
        <Fragment>
            {/* Add MetaData or Page Title if needed */}
            <View style={styles.dashboard}>
                {/* Add Sidebar component or navigation menu */}
                <View style={styles.productListContainer}>
                    <Text style={styles.productListHeading}>ALL PRODUCTS</Text>
                    <FlatList
                        data={products}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
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
    productListContainer: {
        flex: 1,
        padding: 16,
    },
    productListHeading: {
        fontSize: 20,
        marginBottom: 10,
    },
    productItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default ProductList;
