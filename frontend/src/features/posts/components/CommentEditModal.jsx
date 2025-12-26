import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function CommentEditModal({ isOpen, comment, onClose, onSubmit }) {
    const [editedBody, setEditedBody] = useState(() => comment?.text ?? "");

    useEffect(() => {
        if (!comment) {
            onClose();
            return;
        };
        const rafId = requestAnimationFrame(() => setEditedBody(comment.text));
        return () => cancelAnimationFrame(rafId);
    }, [comment, onClose]);

    const handleUpdateComment = () => {
        if (!editedBody?.trim()) return;

        onSubmit({
            commentId: comment.id,
            text: editedBody,
        });

        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl p-8 pb-12 sm:pb-8 border border-white/20"
                    >
                        {/* Drag Handle for Mobile feel */}
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8 sm:hidden" />

                        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-4">
                            <Sparkles size={16} /> Refine Perspective
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">Edit Comment</h2>

                        <textarea
                            value={editedBody}
                            onChange={(e) => setEditedBody(e.target.value)}
                            className="w-full bg-slate-50 border-slate-100 rounded-3xl p-6 text-sm focus:ring-4 focus:ring-indigo-500/10 min-h-[150px] outline-none transition-all mb-6"
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button type='button' onClick={handleUpdateComment} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 shadow-xl shadow-slate-200 transition-all">
                                Update
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}