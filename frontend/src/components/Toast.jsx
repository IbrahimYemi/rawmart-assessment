import { CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { ToastCard } from './ToastCard';

export const notify = {
    success: (title, message) => toast.custom((t) => (
        <ToastCard t={t} title={title} message={message} type="success" icon={<CheckCircle size={20} />} color="text-emerald-500" bg="bg-emerald-500" />
    )),
    error: (title, message) => toast.custom((t) => (
        <ToastCard t={t} title={title} message={message} type="error" icon={<AlertCircle size={20} />} color="text-rose-500" bg="bg-rose-500" />
    )),
    info: (title, message) => toast.custom((t) => (
        <ToastCard t={t} title={title} message={message} type="info" icon={<Sparkles size={20} />} color="text-indigo-500" bg="bg-indigo-500" />
    )),
};