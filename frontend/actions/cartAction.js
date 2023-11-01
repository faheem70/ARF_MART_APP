import {
    ADD_TO_CART,
    CLEAR_CART_ON_LOGOUT,
    LOAD_CART_ITEMS,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    UPDATE_ORDER_HISTORY,
} from "../constants/cartConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`https://arf-backend.onrender.com/api/v1/product/${id}`);
        const productData = response.data.product;

        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: productData._id,
                name: productData.name,
                price: productData.price,
                image: productData.images[0].url,
                stock: productData.Stock,
                quantity,
            },
        });

        // Save the updated cart items in the local storage
        // Use AsyncStorage for React Native
        await AsyncStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        // Handle errors, e.g., show an error message to the user
        console.error("Error while adding item to cart:", error);
    }
};

export const buyItem = (id, quantity) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`https://arf-backend.onrender.com/api/v1/product/${id}`);
        const productData = response.data.product;

        // Create an order object or perform any other actions related to purchasing the item
        const order = {
            product: productData._id,
            name: productData.name,
            price: productData.price,
            image: productData.images[0].url,
            stock: productData.Stock,
            quantity,
            // Add any other required fields for the order
        };

        // Save the order in the database
        await axios.post(`https://arf-backend.onrender.com/api/v1/orders`, order);

        // Perform additional actions, such as generating an invoice or sending a confirmation email

        // Dispatch any necessary actions related to the purchase, such as updating the user's order history, etc.
        dispatch({
            type: UPDATE_ORDER_HISTORY,
            payload: {
                product: order.product,
                name: order.name,
                price: order.price,
                image: order.image,
                stock: order.stock,
                quantity: order.quantity,
            },
        });

        // Clear the cart or perform other necessary actions after the item is purchased

        // Save the updated cart items in the local storage (use AsyncStorage)
        await AsyncStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        // Handle errors, e.g., show an error message to the user
        console.error("Error while buying item:", error);
    }
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });

    // Save the updated cart items in the local storage (use AsyncStorage)
    await AsyncStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    // Save the shipping info in the local storage (use AsyncStorage)
    await AsyncStorage.setItem("shippingInfo", JSON.stringify(data));
};

//LoadCartItems
export const loadCartItems = (isAuthenticated) => async (dispatch, getState) => {
    try {
        let cartItems = [];

        if (isAuthenticated) {
            // Load cart items from local storage only if the user is authenticated
            const storedCartItems = await AsyncStorage.getItem("cartItems");
            if (storedCartItems) {
                cartItems = JSON.parse(storedCartItems);
            }
        } else {
            // Clear cart items from local storage if the user is not authenticated
            await AsyncStorage.removeItem("cartItems");
        }

        dispatch({
            type: LOAD_CART_ITEMS,
            payload: { cartItems, isAuthenticated },
        });
    } catch (error) {
        // Handle any potential error here
        console.error("Error while loading cart items:", error);
    }
};

export const clearCartOnLogout = () => async (dispatch) => {
    try {
        // Clear the cart on user logout
        await AsyncStorage.removeItem("cartItems");
        dispatch({
            type: CLEAR_CART_ON_LOGOUT,
        });
    } catch (error) {
        // Handle any potential error here
        console.error("Error while clearing cart on logout:", error);
    }
};
