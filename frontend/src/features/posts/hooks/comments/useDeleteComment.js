import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentService } from '../../../../services/commentService';
import { APP_CONSTANTS } from '../../../../utils/appConstants';

export const useDeleteComment = (postId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (commentId) => commentService.delete({ postId, commentId }),
        onSuccess: () => {
            queryClient.invalidateQueries([APP_CONSTANTS.QUERY_KEYS.FEED, postId]);
        },
    });
};
