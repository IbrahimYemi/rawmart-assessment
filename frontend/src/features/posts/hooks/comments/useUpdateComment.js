import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentService } from '../../../../services/commentService';
import { APP_CONSTANTS } from '../../../../utils/appConstants';

export const useUpdateComment = (postId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ commentId, text }) =>
            commentService.update({ postId, commentId, text }),
        onSuccess: () => {
            queryClient.invalidateQueries([APP_CONSTANTS.QUERY_KEYS.FEED, postId]);
        },
    });
};
