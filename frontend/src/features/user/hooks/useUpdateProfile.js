import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../../services/userService';
import { APP_CONSTANTS } from '../../../utils/appConstants';

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            const { data } = await userService.updateProfile(payload);
            return data;
        },

        onSuccess: (updatedUser) => {
            queryClient.setQueryData([APP_CONSTANTS.QUERY_KEYS.AUTH_USER], updatedUser);
            localStorage.setItem(
                APP_CONSTANTS.STORAGE_KEYS.AUTH_USER,
                JSON.stringify(updatedUser)
            );
        },
    });
};
