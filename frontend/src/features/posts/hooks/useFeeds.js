import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { postService } from '../../../services/postService';
import { APP_CONSTANTS } from '../../../utils/appConstants';

const INITIAL_LIMIT = 9;
const NEXT_LIMIT = 6;

export const useFeeds = ({ id = null, route = 'feeds', search = null } = {}) => {

    const {
        data,
        isLoading,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        error,
        refetch,
    } = useInfiniteQuery({
        
        queryKey: [APP_CONSTANTS.QUERY_KEYS.FEEDS, route, search],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const limit = pageParam === 1 ? INITIAL_LIMIT : NEXT_LIMIT;

            const { data, meta } = await postService.getAll({
                page: pageParam,
                limit,
                route,
                search,
            });

            return { data, meta };
        },
        getNextPageParam: (lastPage) => {
            return lastPage.meta.hasMore
                ? lastPage.meta.page + 1
                : undefined;
        },
    });

    const posts = data?.pages.flatMap(page => page.data) ?? [];

    const {
        data: post = null,
        isLoading: isLoadingPost,
        isFetching: isFetchingPost,
        error: errorPost,
    } = useQuery({
        queryKey: [APP_CONSTANTS.QUERY_KEYS.FEED, id],
        queryFn: () => postService.getById(id).then(r => r.data),
        enabled: !!id,
    });

    return {
        // feeds
        posts,
        loading: isLoading,
        refreshing: isFetching,
        fetchingMore: isFetchingNextPage,
        hasMore: hasNextPage,
        fetchMore: fetchNextPage,
        refresh: refetch,
        error,

        // single post
        post,
        isLoadingPost,
        isFetchingPost,
        errorPost,
    };
};