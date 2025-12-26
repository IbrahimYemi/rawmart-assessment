import { AlertTriangle, X, Loader2 } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useDeletePost } from '../hooks/useDeletePost';
import { notify } from '../../../components/Toast';


export default function DeletePostModal({ post, setIsDeleteModalOpen, isDeleteModalOpen }) {
    const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

    const confirmDelete = async () => {
        try {
            await deletePost(post.id, { onSuccess: () => notify.success('Post Deleted', 'Post deleted successfully') });
            await new Promise(resolve => setTimeout(resolve, 1500));
        } finally {
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <AnimatePresence>
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-110 flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => !isDeleting && setIsDeleteModalOpen(false)}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden p-8 border border-white/20"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="h-16 w-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
                                <AlertTriangle size={32} />
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-2">Delete Article?</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                                This action cannot be undone. This will permanently remove <span className="text-slate-900 font-bold">"{post.title}"</span> and all its comments.
                            </p>

                            <div className="flex flex-col w-full gap-3">
                                <button
                                    disabled={isDeleting}
                                    onClick={confirmDelete}
                                    className="w-full bg-rose-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-100 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isDeleting ? <Loader2 className="animate-spin" size={18} /> : 'Confirm Delete'}
                                </button>
                                <button
                                    disabled={isDeleting}
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-900 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
