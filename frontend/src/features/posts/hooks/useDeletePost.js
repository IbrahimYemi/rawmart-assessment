import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '../../../services/postService';
import { APP_CONSTANTS } from '../../../utils/appConstants';

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const { data } = await postService.delete(id);
            return { id, ...data };
        },
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries([APP_CONSTANTS.QUERY_KEYS.FEEDS, 'feeds', {}]);

            queryClient.removeQueries([APP_CONSTANTS.QUERY_KEYS.FEED, id]);
        },
    });
};
