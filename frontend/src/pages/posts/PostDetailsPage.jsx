import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, Tag as TagIcon, MessageSquare, Edit3, Trash2, ArrowLeft, Send, Sparkles, Loader2 } from 'lucide-react';
import { CommentItem } from '../../features/posts/components/CommentItem';
import { CommentEditModal } from '../../features/posts/components/CommentEditModal';
import { useAuth } from '../../hooks/auth/useAuth';
import { useExpiration } from '../../hooks/useExpiration';
import DeletePostModal from '../../features/posts/components/DeletePostModal';
import { useFeeds } from '../../features/posts/hooks/useFeeds';
import { PageLoader } from '../../components/PageLoader';
import { notify } from '../../components/Toast';
import { useCreateComment } from '../../features/posts/hooks/comments/useCreateComment';
import { useUpdateComment } from '../../features/posts/hooks/comments/useUpdateComment';
import { useDeleteComment } from '../../features/posts/hooks/comments/useDeleteComment';
import { TopLoadingBar } from '../../components/TopLoadingBar';
import TagUpdateModal from '../../features/posts/components/TagUpdateModal';

export default function PostDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { post, isLoadingPost } = useFeeds({ id });

    const { timeLeft, isExpired } = useExpiration(post?.created_at);

    const [commentToEdit, setCommentToEdit] = useState(null);
    const [newComment, setNewComment] = useState("");
    const { mutate: createComment, isPending: isCreatingComment } = useCreateComment(post?.id);
    const { mutate: updateComment, isPending: isUpdatingComment } = useUpdateComment(post?.id);
    const { mutate: deleteComment, isPending: isDeletingComment } = useDeleteComment(post?.id);

    useEffect(() => {
        if (!isLoadingPost && post == null) {
            notify.info('Post Notfound', 'For one reason or another, that post can not be found');
        }
    }, [isLoadingPost, post]);

    const handleCreateComment = () => {
        createComment(newComment, {
            onSuccess: () => {
                setNewComment('');
            },
        });
    }

    if (isLoadingPost) return <PageLoader />

    if (!isLoadingPost && post == null) {
        return <Navigate to="/" replace />;
    }

    if (isExpired) {
        return <Navigate to="/" replace />;
    }


    const isAuthor = user?.id === post.user?.id;

    return (
        <div className="min-h-screen bg-white selection:bg-indigo-100">
            <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ArrowLeft size={20} />
                    </button>
                    {isAuthor && (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate(`/posts/edit/${post?.id}`)}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-100 transition-all"
                            >
                                <Edit3 size={16} /> <span className='hidden md:block'>Edit Post</span>
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-all"
                            >
                                <Trash2 size={18} /> <span className='hidden md:block'>Delete Post</span>
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {
                !isUpdatingComment || !isDeletingComment && <TopLoadingBar />
            }

            <main className="max-w-5xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-16">

                <article className="flex-1">
                    <motion.header
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-slate-500 font-medium">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold uppercase">
                                    {post.user.name.charAt(0)}
                                </div>
                                <span>{post.user.name}</span>
                            </div>
                            <span className="text-slate-200">/</span>
                            <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </motion.header>

                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6"
                    >
                        {post.content.split('\n').map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </motion.div>

                    <section className="mt-20 pt-12 border-t border-slate-100">
                        <div className="flex items-center gap-3 mb-10">
                            <MessageSquare className="text-indigo-600" />
                            <h3 className="text-2xl font-black text-slate-900">Comments ({post.comments.length})</h3>
                        </div>

                        <div className="mb-12 relative group">

                            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-4xl blur opacity-0 group-focus-within:opacity-10 transition duration-500" />

                            <div className="relative">
                                <textarea
                                    disabled={isCreatingComment}
                                    placeholder={isCreatingComment ? "Syncing your perspective..." : "Add your perspective..."}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className={`w-full bg-slate-50 border-none rounded-3xl p-6 text-sm focus:ring-4 focus:ring-indigo-500/10 min-h-[140px] transition-all outline-none resize-none ${isCreatingComment ? 'opacity-60 cursor-not-allowed italic' : 'opacity-100'}`}
                                />

                                <AnimatePresence>
                                    {isCreatingComment && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 2, ease: "easeInOut" }}
                                            className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-indigo-500 to-purple-500 rounded-b-3xl"
                                        />
                                    )}
                                </AnimatePresence>

                                <button
                                    type='button'
                                    onClick={handleCreateComment}
                                    disabled={isCreatingComment || !newComment.trim()}
                                    className={`absolute bottom-4 right-4 p-3.5 rounded-2xl transition-all shadow-lg flex items-center justify-center min-w-[50px] ${isCreatingComment
                                        ? 'bg-indigo-600 text-white shadow-indigo-200 cursor-wait'
                                        : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-slate-200 active:scale-95 disabled:opacity-30'}`}
                                >
                                    <AnimatePresence mode="wait">
                                        {isCreatingComment ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0, rotate: -90 }}
                                                animate={{ opacity: 1, rotate: 0 }}
                                                exit={{ opacity: 0, rotate: 90 }}
                                            >
                                                <Loader2 size={18} className="animate-spin" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="idle"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                whileHover={{ rotate: [-10, 10, 0], transition: { duration: 0.3 } }}
                                            >
                                                <Send size={18} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>

                                <AnimatePresence>
                                    {isCreatingComment && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="absolute top-4 right-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500"
                                        >
                                            <Sparkles size={12} className="animate-pulse" />
                                            Publishing
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {post.comments.map((comment) => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment}
                                    currentUser={user}
                                    onEdit={() => setCommentToEdit(comment)}
                                    onDelete={() => deleteComment(comment.id)}
                                />
                            ))}
                        </div>
                    </section>
                </article>

                <aside className="lg:w-72 space-y-10">
                    <div className="p-6 rounded-4xl bg-amber-50 border border-amber-100">
                        <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-widest mb-4">
                            <Clock size={16} /> Expiration
                        </div>
                        <p className="text-2xl font-black text-amber-900 tracking-tighter">{timeLeft}</p>
                        <p className="text-xs text-amber-600 mt-1 font-medium italic">Post will vanish forever</p>
                    </div>

                    <div>
                        <h4 className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest mb-4">
                            <TagIcon size={16} /> Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-default">
                                    #{tag}
                                </span>
                            ))}

                            <TagUpdateModal post={post} />
                            
                        </div>
                    </div>
                </aside>
            </main>

            <CommentEditModal
                isOpen={!!commentToEdit}
                comment={commentToEdit}
                onClose={() => setCommentToEdit(null)}
                onSubmit={updateComment}
            />
            <DeletePostModal post={post} setIsDeleteModalOpen={setIsDeleteModalOpen} isDeleteModalOpen={isDeleteModalOpen} />

        </div>
    );
}