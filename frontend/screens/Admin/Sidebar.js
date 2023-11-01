import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose a different icon library



const Sidebar = () => {
    return (
        <View style={styles.sidebar}>
            <TouchableOpacity>
                <Image source={''} style={styles.logo} />
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.link}>
                    <Icon name="dashboard" size={20} color="blue" />
                    <Text style={styles.linkText}>Dashboard</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.link}>
                    <Icon name="plus" size={20} color="green" />
                    <Text style={styles.linkText}>All Products</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.link}>
                    <Icon name="plus" size={20} color="green" />
                    <Text style={styles.linkText}>Create Product</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.link}>
                    <Icon name="list" size={20} color="orange" />
                    <Text style={styles.linkText}>Orders</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.link}>
                    <Icon name="users" size={20} color="purple" />
                    <Text style={styles.linkText}>Users</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.link}>
                    <Icon name="star" size={20} color="yellow" />
                    <Text style={styles.linkText}>Reviews</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    sidebar: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    linkText: {
        marginLeft: 10,
        fontSize: 16,
    },
};

export default Sidebar;
