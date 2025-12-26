import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '../../../services/postService';
import { APP_CONSTANTS } from '../../../utils/appConstants';

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            const { data } = await postService.create(payload);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([APP_CONSTANTS.QUERY_KEYS.FEEDS, 'feeds', {}]);
        },
    });
};
