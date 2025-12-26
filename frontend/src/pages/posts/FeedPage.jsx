import { Plus, Sparkles } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PostLists from '../../features/posts/components/PostLists';
import { useAuth } from '../../hooks/auth/useAuth';

export default function FeedPage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="mx-auto w-full">
            <header className="mb-5 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm tracking-wider uppercase mb-3">
                        <Sparkles size={16} className="animate-pulse" />
                        <span>Premium Feed</span>
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                        The latest <br />
                        <span className="text-slate-400">insights.</span>
                    </h2>
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.05, translateY: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/posts/create')}
                    className="flex items-center gap-2 bg-slate-900 text-white justify-center px-4 py-3 md:px-8 md:py-5 rounded-4xl font-bold shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all group"
                >
                    <Plus size={22} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                    Create Article
                </motion.button>
            </header>
            
            <PostLists user={user} />

        </div>
    );
}