import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { authService } from '../../services/authService';
import { APP_CONSTANTS } from '../../utils/appConstants';

export const useLogin = () => {
    const queryClient = useQueryClient();
    const {login} = useAuth()

    return useMutation({
        mutationFn: authService.login,

        onSuccess: (data) => {
            queryClient.setQueryData(APP_CONSTANTS.QUERY_KEYS.AUTH_USER, data.user);
            login(data?.data);
        },
    });
};
