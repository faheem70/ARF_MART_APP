import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import Cart from '../screens/Cart/Cart';
import Home from '../screens/Home/Home';
import ProductDetails from '../screens/Product/ProductDetails';
import Products from '../screens/Product/Products';
import LoginSignUp from '../screens/User/LoginSignUp';
import Profile from '../screens/User/Profile';
import UpdateProfile from '../screens/User/UpdateProfile';
import UpdatePassword from '../screens/User/UpdatePassword';
import ForgotPassword from '../screens/User/ForgotPassword';
import ResetPassword from '../screens/User/ResetPassword';
import Shipping from '../screens/Cart/Shipping';
import ConfirmOrder from '../screens/Cart/ConfirmOrder';
import Payment from '../screens/Cart/Payment';
import OrderSuccess from '../screens/Cart/OrderSuccess';
import MyOrders from '../screens/Order/MyOrders';
import OrderDetails from '../screens/Order/OrderDetails';
import Dashboard from '../screens/Admin/Dashboard';
import ProductList from '../screens/Admin/ProductList';
import NewProduct from '../screens/Admin/NewProdcut';
import UpdateProduct from '../screens/Admin/UpdateProduct';
import OrderList from '../screens/Admin/OrderList';
import ProcessOrder from '../screens/Admin/ProcessOrder';
import UsersList from '../screens/Admin/UserList';
import UpdateUser from '../screens/Admin/UpdateUser';
import ProductReviews from '../screens/Admin/ProductReviews';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import Otp from '../screens/User/Otp';

//import GoogleLogin from '../screens/User/GoogleLogin';
//import PhoneSignIn from '../screens/User/PhoneSignIn';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const { cartItems } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.user);
    const [homeKey, setHomeKey] = useState(0);

    const HomeStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}
                    key={homeKey}
                />
                <Stack.Screen name="ProductDetails" component={ProductDetails} />
            </Stack.Navigator>
        );
    };

    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{
                        tabBarLabel: "Home",
                        tabBarLabelStyle: { color: "#00975B" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Entypo name="home" size={24} color="#00975B" />
                            ) : (
                                <AntDesign name="home" size={24} color="black" />
                            ),

                    }}
                    listeners={{
                        tabPress: () => setHomeKey(homeKey + 1),
                    }}
                />


                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    initialParams={{ isAuthenticated }}

                    options={{
                        tabBarLabel: "Profile",
                        tabBarLabelStyle: { color: "#00975B" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons name="person" size={24} color="#00975B" />
                            ) : (
                                <Ionicons name="person-outline" size={24} color="black" />
                            ),
                    }}
                />

                <Tab.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        tabBarLabel: "Cart",
                        tabBarLabelStyle: { color: "#00975B" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <AntDesign name="shoppingcart" size={24} color="#00975B" />
                            ) : (
                                <AntDesign name="shoppingcart" size={24} color="black" />
                            ),
                        tabBarBadge: cartItems.length > 0 ? cartItems.length.toString() : null,
                    }}
                />
            </Tab.Navigator>
        );
    }


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Home" component={Home} options={{ unmountOnBlur: true }} />
                <Stack.Screen name="ProductDetails" component={ProductDetails}
                    options={({ route }) => ({ id: route.params.id })} />
                <Stack.Screen name="Products" component={Products} />
                <Stack.Screen
                    name="Main"
                    component={BottomTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="LoginSignUp" component={LoginSignUp} />

                <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
                <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="Shipping" component={Shipping} />
                <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} />
                <Stack.Screen name="Payment" component={Payment} />
                <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
                <Stack.Screen name="Orders" component={MyOrders} />
                <Stack.Screen name="OrderDetails" component={OrderDetails} />
                <Stack.Screen name="Dashboard" component={Dashboard} />

                <Stack.Screen name="NewProduct" component={NewProduct} />
                <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
                <Stack.Screen name="OrderList" component={OrderList} />
                <Stack.Screen name="ProcessOrder" component={ProcessOrder} />
                <Stack.Screen name="UserList" component={UsersList} />
                <Stack.Screen name="UpdateUser" component={UpdateUser} />
                <Stack.Screen name="Otp" component={Otp} />


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator