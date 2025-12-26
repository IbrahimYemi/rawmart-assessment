import { X, Tag as TagIcon, ChevronRight } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

export function TagsModal({ isOpen, onClose, tags, activeTag, onSelect }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-white/20"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2 text-indigo-600">
                                    <TagIcon size={20} />
                                    <h3 className="text-xl font-black tracking-tight text-slate-900">All Categories</h3>
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <X size={20} className="text-slate-400" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                {tags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => onSelect(tag)}
                                        className={`flex items-center justify-center px-3 py-1 md:px-4 md:py-3 rounded-2xl text-sm font-bold transition-all border ${activeTag === tag
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100'
                                            : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-indigo-200 hover:bg-white'
                                            }`}
                                    >
                                        {tag}
                                        <ChevronRight size={14} className={activeTag === tag ? 'opacity-100' : 'opacity-0'} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}