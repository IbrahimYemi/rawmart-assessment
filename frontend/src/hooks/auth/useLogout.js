import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services/authService';
import { APP_CONSTANTS } from '../../utils/appConstants';
import { useAuth } from './useAuth';

export const useLogout = () => {
    const queryClient = useQueryClient();
    const { logout } = useAuth()

    return useMutation({
        mutationFn: authService.logout,

        onSuccess: () => {
            logout();
            queryClient.removeQueries(APP_CONSTANTS.QUERY_KEYS.AUTH_USER);
            queryClient.clear();
        },
    });
};
