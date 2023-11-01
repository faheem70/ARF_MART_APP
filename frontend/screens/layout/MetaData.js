import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ScreenWithMetaData = () => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        // navigation.setOptions({ title: 'Your Screen Title' });
    }, [navigation]);

    return (
        <View style={{ backgroundColor: "#00975B" }}>

        </View>
    );
};

export default ScreenWithMetaData;
