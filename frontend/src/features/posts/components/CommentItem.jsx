import { useState } from "react";
import { Edit3, Trash2, AlertTriangle, X, Loader2 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export function CommentItem({ comment, currentUser, onEdit, onDelete }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const isMyComment = currentUser?.id === comment.user_id;

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete(comment.id);
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="group flex gap-4 transition-all duration-300 hover:bg-slate-50/50 p-2 -m-2 rounded-2xl">
                <div className="h-10 w-10 rounded-xl bg-linear-to-br from-slate-100 to-slate-200 shrink-0 flex items-center justify-center font-black text-slate-500 border border-slate-200 shadow-sm">
                    {comment.user?.image ? (
                        <img src={comment.user?.image} alt={comment.user?.name} className="h-full w-full object-cover" />
                    ) : (
                        comment.user?.name.charAt(0).toUpperCase()
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <span className="font-black text-slate-900 text-sm tracking-tight">
                                {comment.user?.name}
                            </span>
                            {isMyComment && (
                                <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-indigo-50 text-indigo-500 rounded-md">
                                    You
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                                {comment.time || 'Just now'}
                            </span>

                            {isMyComment && (
                                <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-all duration-200">
                                    <button
                                        onClick={onEdit}
                                        className="text-slate-400 hover:text-indigo-600 p-1.5 hover:bg-white rounded-lg shadow-sm transition-all"
                                    >
                                        <Edit3 size={14} />
                                    </button>
                                    <button
                                        onClick={() => setIsDeleteModalOpen(true)}
                                        className="text-slate-400 hover:text-rose-500 p-1.5 hover:bg-white rounded-lg shadow-sm transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed font-medium">
                        {comment.text}
                    </p>
                </div>
            </div>

            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-120 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isDeleting && setIsDeleteModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            className="relative bg-white rounded-4xl shadow-2xl w-full max-w-sm overflow-hidden p-8 border border-white/20"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="h-14 w-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4">
                                    <AlertTriangle size={28} />
                                </div>

                                <h3 className="text-xl font-black text-slate-900 mb-2">Remove Comment?</h3>
                                <p className="text-slate-500 text-xs font-bold leading-relaxed mb-8 uppercase tracking-wide">
                                    This action is permanent.
                                </p>

                                <div className="flex w-full gap-3">
                                    <button
                                        disabled={isDeleting}
                                        onClick={() => setIsDeleteModalOpen(false)}
                                        className="flex-1 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        disabled={isDeleting}
                                        onClick={handleConfirmDelete}
                                        className="flex-1 bg-rose-500 text-white py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-100 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isDeleting ? <Loader2 className="animate-spin" size={16} /> : 'Delete'}
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-slate-900 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}