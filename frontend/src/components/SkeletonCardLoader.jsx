// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export const SkeletonCardLoader = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 h-full flex flex-col relative overflow-hidden">
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="absolute inset-0 bg-linear-to-r from-transparent via-slate-50/50 to-transparent z-10"
            />

            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-slate-100 animate-pulse" />
                    <div className="space-y-2">
                        <div className="h-3 w-20 bg-slate-100 rounded-full animate-pulse" />
                        <div className="h-2 w-12 bg-slate-50 rounded-full animate-pulse" />
                    </div>
                </div>
                <div className="h-6 w-16 bg-amber-50 rounded-xl animate-pulse" />
            </div>

            <div className="grow space-y-3">
                <div className="h-6 w-3/4 bg-slate-100 rounded-lg animate-pulse" />
                <div className="space-y-2">
                    <div className="h-3 w-full bg-slate-50 rounded-full animate-pulse" />
                    <div className="h-3 w-full bg-slate-50 rounded-full animate-pulse" />
                    <div className="h-3 w-2/3 bg-slate-50 rounded-full animate-pulse" />
                </div>
            </div>

            <div className="flex gap-2 mt-6 mb-8">
                <div className="h-5 w-12 bg-slate-50 rounded-lg animate-pulse" />
                <div className="h-5 w-16 bg-slate-50 rounded-lg animate-pulse" />
            </div>

            <div className="flex justify-between items-center pt-5 border-t border-slate-50">
                <div className="flex gap-4">
                    <div className="h-4 w-4 bg-slate-100 rounded-full animate-pulse" />
                    <div className="h-4 w-4 bg-slate-100 rounded-full animate-pulse" />
                </div>
                <div className="h-8 w-24 bg-slate-100 rounded-xl animate-pulse" />
            </div>
        </div>
    );
};