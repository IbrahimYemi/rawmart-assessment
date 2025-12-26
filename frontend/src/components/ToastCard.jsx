// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

export const ToastCard = ({ t, title, message, icon, color, bg }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-4xl pointer-events-auto flex p-4 ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-2">
                <div className="flex items-start">
                    <div className={`shrink-0 pt-0.5 ${color}`}>
                        {icon}
                    </div>
                    <div className="ml-4 flex-1">
                        <p className="text-sm font-black text-slate-900 tracking-tight">
                            {title}
                        </p>
                        <p className="mt-1 text-xs font-medium text-slate-500 leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-slate-100 ml-4 pl-2">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={18} />
                </button>
            </div>

            <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4, ease: "linear" }}
                className={`absolute bottom-0 left-6 right-6 h-1 ${bg} rounded-full opacity-20`}
            />
        </motion.div>
    );
};