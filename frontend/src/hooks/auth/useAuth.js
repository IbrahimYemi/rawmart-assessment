import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const useAuth = () => {
    const { user, login, logout } = useContext(AuthContext);

    return {
        user,
        isAuthenticated: !!user,
        login,
        logout,
    };
};
