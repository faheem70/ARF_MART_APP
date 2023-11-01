import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

const CountdownTimer = ({ countdownTimestampMs }) => {
    const [remainingTime, setRemainingTime] = useState({
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const timeDifference = countdownTimestampMs - now;

            if (timeDifference <= 0) {
                // Timer has expired
                clearInterval(interval);
            } else {
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setRemainingTime({
                    hours: padWithZeros(hours, 2),
                    minutes: padWithZeros(minutes, 2),
                    seconds: padWithZeros(seconds, 2),
                });
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [countdownTimestampMs]);

    return (
        <Text>
            {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}
        </Text>
    );
};

function padWithZeros(number, minLength) {
    const numberString = number.toString();
    if (numberString.length >= minLength) return numberString;
    return '0'.repeat(minLength - numberString.length) + numberString;
}

export default CountdownTimer;
