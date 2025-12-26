import { useState } from 'react';
import {
    Plus, Sparkles, Edit3, Lock, Mail,
    Calendar, FileText, MessageSquare, Camera
} from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { EditProfileModal } from '../../features/user/components/EditProfileModal';
import { ChangePasswordModal } from '../../features/user/components/ChangePasswordModal';
import { useAuth } from '../../hooks/auth/useAuth';
import PostLists from '../../features/posts/components/PostLists';
import { useUser } from '../../features/user/hooks/useUser';

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { loading, data } = useUser();

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isPassModalOpen, setPassModalOpen] = useState(false);

    return (
        <div className="mx-auto w-full">
            <div className="relative mb-16">
                <div className="absolute inset-0 h-48 bg-linear-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 rounded-[3rem] -z-10 blur-2xl" />

                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center px-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative group"
                    >
                        <div className="h-32 w-32 md:h-40 md:w-40 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl bg-slate-200">
                            {user?.image ? (
                                <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-4xl font-black text-slate-400 bg-slate-100">
                                    {user?.name?.charAt(0)}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => setEditModalOpen(true)}
                            className="absolute -bottom-2 -right-2 p-3 bg-white shadow-xl rounded-2xl text-indigo-600 hover:scale-110 transition-transform border border-slate-100"
                        >
                            <Camera size={20} />
                        </button>
                    </motion.div>

                    <div className="flex-1">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
                                {user?.name || "Premium Creator"}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-slate-500 font-bold text-sm">
                                <span className="flex items-center gap-1.5"><Mail size={16} className="text-indigo-500" /> {user?.email}</span>
                                <span className="flex items-center gap-1.5"><Calendar size={16} className="text-indigo-500" /> {user?.joined_at}</span>
                            </div>
                        </motion.div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setEditModalOpen(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
                            >
                                <Edit3 size={18} /> Edit Profile
                            </button>
                            <button
                                onClick={() => setPassModalOpen(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
                            >
                                <Lock size={18} /> Privacy
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <StatCard icon={<FileText size={20} />} value={!loading ? (data?.articles || user?.articles) : 0} label="Articles" />
                        <StatCard icon={<MessageSquare size={20} />} value={!loading ? (data?.comments || user?.comments) : 0} label="Comments" />
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-100 pt-12">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm tracking-wider uppercase mb-3">
                            <Sparkles size={16} className="animate-pulse" />
                            <span>Creator Studio</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                            Your Published <br />
                            <span className="text-slate-400">Insights.</span>
                        </h2>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, translateY: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/posts/create')}
                        className="flex items-center gap-2 bg-slate-900 text-white px-8 py-5 rounded-4xl font-bold shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all group"
                    >
                        <Plus size={22} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                        Create Article
                    </motion.button>
                </header>

                <PostLists user={user} route={'personal'} />
            </div>

            <EditProfileModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} user={user} />
            <ChangePasswordModal isOpen={isPassModalOpen} onClose={() => setPassModalOpen(false)} />
        </div>
    );
}

function StatCard({ icon, value, label }) {
    return (
        <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-w-[120px]">
            <div className="text-indigo-600 mb-2">{icon}</div>
            <span className="text-2xl font-black text-slate-900">{value}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
        </div>
    );
}