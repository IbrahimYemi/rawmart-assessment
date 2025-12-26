import { useState, useEffect } from 'react';

export const useExpiration = (createdAt) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const calculateTime = () => {
            const expiryDate = new Date(new Date(createdAt).getTime() + 24 * 60 * 60 * 1000);
            const now = new Date();
            const diff = expiryDate - now;

            if (diff <= 0) {
                setIsExpired(true);
                setTimeLeft('Expired');
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            setTimeLeft(`${hours}h ${minutes}m remaining`);
        };

        calculateTime();
        const interval = setInterval(calculateTime, 60000);
        return () => clearInterval(interval);
    }, [createdAt]);

    return { timeLeft, isExpired };
};