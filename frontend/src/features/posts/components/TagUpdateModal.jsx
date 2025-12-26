import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Tag as TagIcon, X, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { TagInput } from './TagInput';
import { notify } from '../../../components/Toast';
import { useUpdateTag } from '../hooks/useUpdateTag';

const TAG_LIMIT = 20;

export default function TagUpdateModal({ post }) {
    const [isOpen, setIsOpen] = useState(false);
    const [tags, setTags] = useState(() => post?.tags || []);
    const [currentTag, setCurrentTag] = useState('');
    const [errors, setErrors] = useState({});

    const { mutate: updatePost, isPending: isSubmitting } = useUpdateTag();

    const handleTagInput = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();

            if (tags.length >= TAG_LIMIT) {
                setErrors({ tags: `Maximum of ${TAG_LIMIT} tags allowed` });
                return;
            }

            const tag = currentTag.trim().replace(/,/g, '');

            if (tag.length > 20) {
                setErrors({ tags: "A tag can't exceed 20 characters" });
                return;
            }

            if (tag && !tags.includes(tag)) {
                setTags([...tags, tag]);
                setCurrentTag('');
                setErrors({});
            }
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (tags.length === 0) {
            setErrors({ tags: 'Add at least one tag' });
            return;
        }

        updatePost({ id: post.id, payload: { tags } }, {
            onSuccess: () => {
                notify.success('Tags Synchronized', 'Post categories updated successfully.');
                setIsOpen(false);
            },
            onError: (err) => setErrors(err.response?.data?.errors || { general: 'Failed to update tags' })
        });
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-slate-50 text-slate-500 rounded-xl font-bold text-xs hover:bg-indigo-50 hover:text-indigo-600 transition-all group border border-transparent hover:border-indigo-100"
            >
                <TagIcon size={14} className="group-hover:rotate-12 transition-transform" />
                Manage Tags
            </button>

            <AnimatePresence>
                {isOpen && (
                    /* 
                       SCROLLABLE WRAPPER: 
                       'overflow-y-auto' allows the modal to scroll if it exceeds viewport height.
                       'fixed inset-0' ensures it covers the screen.
                    */
                    <div className="fixed inset-0 z-150 overflow-y-auto scrollbar-hide">

                        {/* Backdrop: Remains fixed behind the scrollable content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isSubmitting && setIsOpen(false)}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl"
                        />

                        {/* 
                           Y-AXIS SPACING CONTAINER:
                           'min-h-full' + 'flex items-center' + 'py-20' 
                           Ensures vertical centering AND a forced gap at top/bottom.
                        */}
                        <div className="flex min-h-full items-center justify-center p-4 py-20 sm:p-6">

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20"
                            >

                                <div className="h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />

                                <div className="p-10">
                                    <header className="mb-8 flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2">
                                                <Sparkles size={14} /> Taxonomy
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                                                Update Categories
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="p-2 hover:bg-slate-50 rounded-xl text-slate-300 hover:text-slate-900 transition-all cursor-pointer"
                                        >
                                            <X size={20} />
                                        </button>
                                    </header>

                                    {/* Tag Editor Section */}
                                    <div className="space-y-6">
                                        <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                            <TagInput
                                                tags={tags}
                                                currentTag={currentTag}
                                                setCurrentTag={setCurrentTag}
                                                handleTagInput={handleTagInput}
                                                removeTag={removeTag}
                                                error={errors.tags}
                                            />

                                            {/* Dynamic Helper Text */}
                                            <div className="mt-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                                <span className={tags.length >= TAG_LIMIT ? 'text-rose-500' : 'text-slate-400'}>
                                                    {tags.length} / {TAG_LIMIT} Tags
                                                </span>
                                                <span className="text-slate-300 italic">Press Enter to add</span>
                                            </div>
                                        </div>

                                        {errors.general && (
                                            <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl flex items-center gap-2 text-xs font-bold border border-rose-100">
                                                <AlertCircle size={16} /> {errors.general}
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 mt-10">
                                        <button
                                            type="button"
                                            disabled={isSubmitting}
                                            onClick={() => setIsOpen(false)}
                                            className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer order-2 sm:order-1"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            disabled={isSubmitting}
                                            onClick={handleSubmit}
                                            className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-indigo-600 shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer order-1 sm:order-2"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="animate-spin" size={18} />
                                            ) : (
                                                'Save Changes'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}