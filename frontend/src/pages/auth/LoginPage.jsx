import { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { APP_CONSTANTS } from '../../utils/appConstants';
import { useLogin } from '../../hooks/auth/useLogin';
import { notify } from '../../components/Toast';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { mutate: login, isPending } = useLogin();


    const handleSubmit = async (e) => {
        e.preventDefault();
        login(
            formData,
            {
                onSuccess: () => navigate('/'),
                onError: (err) => {
                    notify.error('Validation error', err.response?.data?.message);
                    setError(err.response?.data?.message);
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            <AnimatePresence mode="wait">
                {error && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm flex items-start gap-3"
                    >
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <p className="font-medium leading-relaxed">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-4">
                <div className="relative group">
                    <Mail
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors 
                        ${error ? 'text-red-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`}
                        size={18}
                    />
                    <input
                        type="email"
                        required
                        placeholder="Email address"
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all text-sm
                        ${error ? 'border-red-200 focus:ring-4 focus:ring-red-500/10' : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}`}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <div className="relative group">
                        <Lock
                            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors 
                            ${error ? 'text-red-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`}
                            size={18}
                        />
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all text-sm
                            ${error ? 'border-red-200 focus:ring-4 focus:ring-red-500/10' : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}`}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div className="flex justify-end px-1">
                        <button type="button" className="text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors">
                            Forgot password?
                        </button>
                    </div>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isPending}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-70 group"
            >
                {isPending ? (
                    <Loader2 className="animate-spin" size={20} />
                ) : (
                    <>
                        Sign In
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </motion.button>

            <div className="text-center pt-4">
                <p className="text-sm text-slate-500">
                    New to {APP_CONSTANTS.BUSINESS_NAME}?{' '}
                    <Link
                        to="/signup"
                        className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors underline underline-offset-4 decoration-indigo-200 hover:decoration-indigo-500"
                    >
                        Create account
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default LoginPage;