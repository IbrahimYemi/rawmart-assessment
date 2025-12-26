import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import { APP_CONSTANTS } from '../utils/appConstants';

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_USER);
        return saved ? JSON.parse(saved) : null;
    });

    const login = (data) => {
        const authUser = data?.user;

        setUser(authUser);

        localStorage.setItem(
            APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN,
            data.access_token
        );
        localStorage.setItem(
            APP_CONSTANTS.STORAGE_KEYS.AUTH_USER,
            JSON.stringify(authUser)
        );

        queryClient.setQueryData(
            APP_CONSTANTS.QUERY_KEYS.AUTH_USER,
            authUser
        );
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();

        queryClient.removeQueries({
            queryKey: APP_CONSTANTS.QUERY_KEYS.AUTH_USER,
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
