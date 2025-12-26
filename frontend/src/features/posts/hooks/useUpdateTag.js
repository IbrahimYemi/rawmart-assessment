import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '../../../services/postService';
import { APP_CONSTANTS } from '../../../utils/appConstants';

export const useUpdateTag = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, payload }) => {
            const { data } = await postService.updateTag(id, payload);
            return data;
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries([APP_CONSTANTS.QUERY_KEYS.FEED, variables.id]);
        },
    });
};
