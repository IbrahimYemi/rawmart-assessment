import { useState } from 'react';
import {
    MessageSquare, Clock, Share2, Trash2, Eye, Edit3
} from 'lucide-react';
import { useExpiration } from '../../../hooks/useExpiration';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import DeletePostModal from './DeletePostModal';

export const PostCard = ({ post, onEdit, index, currentUser, onDetails }) => {
    const { timeLeft, isExpired } = useExpiration(post.created_at);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    if (isExpired) return null;

    const isMyPost = currentUser?.id === post.user?.id;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white border border-slate-200/60 rounded-4xl p-6 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:border-indigo-100 transition-all duration-500 flex flex-col h-full"
            >
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-linear-to-tr from-slate-50 to-slate-100 flex items-center justify-center font-bold text-indigo-600 border border-slate-200 shadow-sm">
                            {post.user?.image ? (
                                <img src={post.user?.image} alt={post.user?.name} className="h-full w-full object-cover" />
                            ) : (
                                post.user?.name.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-900 leading-none">{post.user.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Author</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-amber-50/80 backdrop-blur-sm text-amber-700 px-3 py-1.5 rounded-xl border border-amber-100/50">
                        <Clock size={14} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-wider">{timeLeft}</span>
                    </div>
                </div>

                <div className="grow">
                    <button
                        onClick={onDetails}
                        className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-snug cursor-pointer text-left block w-full"
                    >
                        {post.title}
                    </button>
                    <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-6 font-medium">
                        {post.content}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {post.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-tighter">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onDetails}
                            className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 transition-colors p-1"
                        >
                            <MessageSquare size={18} />
                            <span className="text-xs font-black">{post.comments.length}</span>
                        </button>
                        <button className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                            <Share2 size={18} />
                        </button>
                        {isMyPost && (
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                            >
                                <Trash2 size={18} />
                            </button>
                        )}
                    </div>

                    <div className="flex gap-2 items-center">
                        <button
                            onClick={onDetails}
                            className="text-[11px] cursor-pointer flex items-center gap-1.5 font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all"
                        >
                            <Eye size={16} />
                            Read
                        </button>

                        {isMyPost && (
                            <button
                                onClick={onEdit}
                                className="p-2 cursor-pointer text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all"
                                title="Edit Post"
                            >
                                <Edit3 size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
            <DeletePostModal post={post} setIsDeleteModalOpen={setIsDeleteModalOpen} isDeleteModalOpen={isDeleteModalOpen} />
        </>
    );
};