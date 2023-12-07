import React from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';

const Loader = () => {
    return (
        <View style={styles.loading}>
          <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fff" />
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    },
    loaderContainer: {
        backgroundColor: '#333', // Dark background
        borderRadius: 10,
        padding: 20,
        ...Platform.select({
            android: {
                elevation: 5,
            },
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 4,
            },
        }),
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Loader;
