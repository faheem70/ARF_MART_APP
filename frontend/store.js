import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    categoryProductsReducer,
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productReducer,
    productReviewsReducer,
    productsReducer,
    reviewReducer,
} from "./reducer/productReducer";

import {
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,
    userReducer,
} from "./reducer/userReducer";

import { cartReducer } from "./reducer/cartReducer";
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
} from "./reducer/orderReducer";

import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    categoryProducts: categoryProductsReducer,
});

// Initialize the initialState with default values
let initialState = {
    cart: {
        cartItems: [],
        shippingInfo: {},
    },
};

// Load cart items and shipping info from AsyncStorage
AsyncStorage.getItem("cartItems")
    .then((cartItems) => {
        if (cartItems) {
            initialState.cart.cartItems = JSON.parse(cartItems);
        }
    })
    .catch((error) => console.log(error));

AsyncStorage.getItem("shippingInfo")
    .then((shippingInfo) => {
        if (shippingInfo) {
            initialState.cart.shippingInfo = JSON.parse(shippingInfo);
        }
    })
    .catch((error) => console.log(error));

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
