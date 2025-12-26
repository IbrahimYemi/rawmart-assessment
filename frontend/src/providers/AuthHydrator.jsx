import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { APP_CONSTANTS } from '../utils/appConstants';

export const AuthHydrator = ({ children }) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const storedUser = localStorage.getItem(
            APP_CONSTANTS.STORAGE_KEYS.AUTH_USER
        );

        if (storedUser) {
            queryClient.setQueryData(
                APP_CONSTANTS.QUERY_KEYS.USER,
                JSON.parse(storedUser)
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return children;
};
