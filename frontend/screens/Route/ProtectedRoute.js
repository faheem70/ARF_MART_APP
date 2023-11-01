import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const ProtectedRoute = ({ isAdmin, component: Component }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const navigation = useNavigation();

    if (!isAuthenticated) {
        // Redirect to the login screen if not authenticated
        navigation.navigate('Login'); // Replace 'Login' with the name of your login screen
        return null;
    }

    if (isAdmin && user.role !== 'admin') {
        // Redirect to the login screen if not an admin
        navigation.navigate('Login'); // Replace 'Login' with the name of your login screen
        return null;
    }

    return <Component />;
};

export default ProtectedRoute;
