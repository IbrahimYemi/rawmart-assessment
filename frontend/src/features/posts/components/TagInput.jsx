// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { X, Info } from "lucide-react";

export const TagInput = ({
    tags = [],
    currentTag,
    setCurrentTag,
    handleTagInput,
    removeTag,
    error,
    showEphemeralInfo = true,
}) => {
    return (
        <div className="space-y-8">
            {/* Tags Input */}
            <div>
                <div className="flex justify-between items-end mb-4">
                    <label className="text-sm font-black text-slate-900 tracking-tight">
                        Tags
                    </label>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Required
                    </span>
                </div>

                <div className="relative group">
                    <input
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={handleTagInput}
                        placeholder="Add tag..."
                        className={`w-full bg-white border ${error ? "border-rose-200 focus:ring-rose-500/10" : "border-slate-200 focus:border-indigo-500"
                            } rounded-2xl px-5 py-4 text-sm outline-none focus:ring-4 transition-all`}
                    />
                </div>

                {/* Tag List */}
                <div className="flex flex-wrap gap-2 mt-4">
                    <AnimatePresence>
                        {tags.map((tag) => (
                            <motion.span
                                key={tag}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="flex items-center gap-1.5 px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-xl text-[11px] font-black shadow-sm group hover:border-rose-200 transition-colors"
                            >
                                #{tag.toUpperCase()}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="text-slate-300 group-hover:text-rose-500 transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            </motion.span>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-rose-500 text-[11px] mt-3 font-bold italic"
                    >
                        * {error}
                    </motion.p>
                )}
            </div>

            {/* Ephemeral Info Box */}
            {showEphemeralInfo && (
                <div className="pt-8 border-t border-slate-200/60">
                    <div className="flex items-start gap-4 p-5 bg-indigo-600 text-white rounded-4xl shadow-xl shadow-indigo-100">
                        <Info size={20} className="shrink-0 mt-0.5 opacity-80" />
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-wider mb-1">
                                Ephemeral Post
                            </p>
                            <p className="text-[10px] leading-relaxed font-bold opacity-90">
                                This article will self-destruct 24h after publishing.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};