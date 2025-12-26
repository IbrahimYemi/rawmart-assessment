import { Sparkles } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate, Outlet } from 'react-router-dom';
import appBanner from '../assets/banner-img.jpg';
import { useAuth } from '../hooks/auth/useAuth';

const AuthModal = () => {
    const { user } = useAuth();

    if (user) return <Navigate to="/" replace />;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">

                {/* Banner as full background */}
                <img
                    src={appBanner}
                    alt="App banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
                />

                {/* Modal content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-[480px] overflow-hidden border border-white/20"
                >
                    <div className="h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />

                    <div className="p-8 sm:p-12">
                        <header className="mb-8">
                            <div className="flex items-center gap-2 text-indigo-600 font-bold mb-2">
                                <Sparkles size={18} />
                                <span className="text-xs uppercase tracking-widest">Join the Community</span>
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                Welcome back.
                            </h2>
                            <p className="text-slate-500 mt-2 text-sm">
                                Enter your credentials and get started!
                            </p>
                        </header>

                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Outlet />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;