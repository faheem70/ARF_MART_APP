import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getRemainingTimeUntilMsTimestamp } from '../Utils/CountdownTimerUtils';

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
};

const CountDownTimer = ({ countdownTimestampMs }) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return (
        <View style={styles.countdownTimer}>
            <Text style={styles.text}>Ending In: </Text>
            <Text style={styles.twoNumbers}>{remainingTime.hours}</Text>
            <Text style={styles.text}>hours</Text>
            <Text style={styles.twoNumbers}>{remainingTime.minutes}</Text>
            <Text style={styles.text}>minutes</Text>
            <Text style={styles.twoNumbers}>{remainingTime.seconds}</Text>
            <Text style={styles.text}>seconds</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    countdownTimer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginRight: 5,
    },
    twoNumbers: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
    },
});

export default CountDownTimer;
