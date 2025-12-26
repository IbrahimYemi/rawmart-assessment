// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { APP_CONSTANTS } from '../utils/appConstants';

export const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-200 bg-white flex flex-col items-center justify-center">
            <div className="relative">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl"
                />

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative text-4xl font-black tracking-tighter text-slate-900 z-10"
                >
                    {APP_CONSTANTS.BUSINESS_NAME}
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-indigo-600"
                    >
                        .
                    </motion.span>
                </motion.h1>
            </div>

            <div className="mt-8 w-48 h-1 bg-slate-100 rounded-full overflow-hidden relative">
                <motion.div
                    initial={{ left: '-100%' }}
                    animate={{ left: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent"
                />
            </div>

            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">
                Synchronizing Insights
            </p>
        </div>
    );
};