import { useMemo, useEffect, useRef } from 'react';
import { Plus, ArrowUpDown, Search as SearchIcon, X } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PostCard } from './PostCard';
import { TagsModal } from './TagsModal';
import { FeedLoader } from './FeedLoader';
import { useFeeds } from '../hooks/useFeeds';
import { TopLoadingBar } from '../../../components/TopLoadingBar';

export default function PostLists({ user = null, route = null }) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const loaderRef = useRef();

    const activeTag = searchParams.get('tag') || 'All';
    const searchQuery = searchParams.get('q') || '';
    const sortOrder = searchParams.get('sort') || 'newest';

    const { posts, fetchMore, hasMore, fetchingMore, loading, refreshing } = useFeeds({
        route,
        search: {
            q: searchQuery,
            tag: activeTag !== 'All' ? activeTag : null,
            sort: sortOrder
        }
    });

    useEffect(() => {
        if (!hasMore || fetchingMore) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) fetchMore();
        });
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [hasMore, fetchingMore, fetchMore]);

    const updateParams = (newParams) => {
        const params = new URLSearchParams(searchParams);
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null || value === 'All' || value === '') {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        setSearchParams(params);
    };

    const allTags = useMemo(() => {
        
        const tags = posts.flatMap(post => post.tags);

        const freqMap = tags.reduce((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
        }, {});

        const topTags = Object.entries(freqMap)
            .sort(([, aCount], [, bCount]) => bCount - aCount)
            .slice(0, 50)
            .map(([tag]) => tag);

        return ['All', ...topTags];
    }, [posts]);


    const visibleTags = allTags.slice(0, 5);
    const remainingTagsCount = allTags.length - visibleTags.length;

    if (loading) return <FeedLoader />;

    return (
        <div className="space-y-8">

            <AnimatePresence>
                {searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-slate-500 text-sm font-medium bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100 w-fit"
                    >
                        <SearchIcon size={14} className="text-indigo-500" />
                        Search: <span className="text-indigo-700 font-bold">"{searchQuery}"</span>
                        <button onClick={() => updateParams({ q: '' })} className="ml-2 p-1 hover:bg-indigo-100 rounded-full transition-colors">
                            <X size={14} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">

                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2">
                    {visibleTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => updateParams({ tag })}
                            className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border ${activeTag === tag
                                ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 border-slate-900'
                                : 'bg-white text-slate-400 hover:text-slate-600 hover:border-slate-200 border-transparent shadow-sm'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}

                    {remainingTagsCount > 0 && (
                        <button
                            onClick={() => updateParams({ tags_modal: 'open' })}
                            className="px-4 py-2.5 rounded-2xl text-sm font-bold text-slate-400 hover:bg-slate-100 transition-all"
                        >
                            <Plus size={14} className="inline mr-1" /> {remainingTagsCount}
                        </button>
                    )}
                </div>

                <button
                    onClick={() => updateParams({ sort: sortOrder === 'newest' ? 'oldest' : 'newest' })}
                    className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group"
                >
                    <ArrowUpDown size={16} className={`text-slate-400 group-hover:text-indigo-600 transition-transform duration-500 ${sortOrder === 'oldest' ? 'rotate-180' : ''}`} />
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Sort</span>
                        <span className="text-sm font-bold text-slate-900">{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
                    </div>
                </button>
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {posts.map((post, index) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            index={index}
                            currentUser={user}
                            onEdit={() => navigate(`/posts/edit/${post.id}`)}
                            onDetails={() => navigate(`/posts/${post.id}`)}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            <div ref={loaderRef} className="h-20 flex items-center justify-center">
                {fetchingMore || refreshing && <TopLoadingBar />}
            </div>

            {posts.length === 0 && !loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 flex flex-col items-center text-center">
                    <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                        <SearchIcon size={32} className="text-slate-200" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">No articles found</h3>
                    <p className="text-slate-400 max-w-xs mx-auto">
                        We couldn't find any results matching your current filters. Try adjusting your search or category.
                    </p>
                    <button onClick={() => setSearchParams({})} className="mt-8 text-sm font-bold text-indigo-600 hover:underline">
                        Clear all filters
                    </button>
                </motion.div>
            )}

            <TagsModal
                isOpen={searchParams.get('tags_modal') === 'open'}
                onClose={() => updateParams({ tags_modal: null })}
                tags={allTags}
                activeTag={activeTag}
                onSelect={(tag) => updateParams({ tag, tags_modal: null })}
            />
        </div>
    );
}