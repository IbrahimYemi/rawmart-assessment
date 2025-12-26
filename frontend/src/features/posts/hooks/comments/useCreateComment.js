import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentService } from '../../../../services/commentService';
import { APP_CONSTANTS } from '../../../../utils/appConstants';

export const useCreateComment = (postId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (text) => commentService.create({ postId, text }),
        onSuccess: () => {
            queryClient.invalidateQueries([APP_CONSTANTS.QUERY_KEYS.FEED, postId]);
        },
    });
};