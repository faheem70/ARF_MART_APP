import React from 'react';
import { View, Text, Image } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const ReviewCard = ({ review }) => {
    return (
        <View style={styles.reviewCard}>

            <Text>{review.name}</Text>
            <AirbnbRating
                count={5}
                defaultRating={review.rating}
                size={20}
                isDisabled
            />
            <Text style={styles.reviewCardComment}>{review.comment}</Text>
        </View>
    );
};

export default ReviewCard;

const styles = {
    reviewCard: {
        flexDirection: 'column',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    reviewCardComment: {
        marginTop: 10,
    },
};
