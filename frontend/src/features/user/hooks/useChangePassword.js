import { useMutation } from '@tanstack/react-query';
import { userService } from '../../../services/userService';

export const useChangePassword = () => {
    return useMutation({
        mutationFn: async (payload) => {
            const { data } = await userService.changePassword(payload);
            return data;
        },
    });
};
