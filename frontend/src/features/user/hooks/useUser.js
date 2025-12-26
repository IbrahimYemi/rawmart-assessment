import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../../services/userService';
import { APP_CONSTANTS } from '../../../utils/appConstants';

export const useUser = () => {
    const queryClient = useQueryClient();

    const { isLoading, data } = useQuery({
        queryKey: [APP_CONSTANTS.QUERY_KEYS.AUTH_USER],
        queryFn: () => userService.me(),
        onSuccess: (freshUser) => {

            queryClient.setQueryData(
                [APP_CONSTANTS.QUERY_KEYS.AUTH_USER],
                freshUser
            );

            localStorage.setItem(
                APP_CONSTANTS.STORAGE_KEYS.AUTH_USER,
                JSON.stringify(freshUser)
            );
        },
    });

    return { loading: isLoading, data };
};