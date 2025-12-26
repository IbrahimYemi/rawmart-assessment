import { useEffect, useState } from 'react';
import { Mail, User as UserIcon, Camera, Loader2, X, Sparkles, AlertCircle } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { notify } from '../../../components/Toast';

export function EditProfileModal({ isOpen, onClose, user }) {
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const handleImageChange = (e) => {
        const selected = e.target.files?.[0];
        if (!selected || !selected.type.startsWith('image/')) {
            notify.error('Invalid File', 'Please select a valid image file');
            return;
        }

        setFile(selected);
        const url = URL.createObjectURL(selected);
        setPreview(url);
        if (errors.avatar) setErrors(prev => ({ ...prev, avatar: null }));
    };

    useEffect(() => {
        return () => preview && URL.revokeObjectURL(preview);
    }, [preview]);

    const handleSubmit = () => {
        setErrors({});

        const data = new FormData();
        data.append('name', form.name);
        data.append('email', form.email);
        if (file) data.append('image', file);

        updateProfile(data, {
            onSuccess: () => {
                notify.success('Profile Updated', 'Your identity has been synchronized.');
                onClose();
            },
            onError: (err) => {
                setErrors('Error', err.response?.data?.message || { general: 'Failed to update profile' });
                notify.error('Update Failed');
            }
        });
    };

    const getError = (field) => errors[field]?.[0];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-6">

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20"
                    >

                        <div className="h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />

                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-10 pt-12">
                            <header className="mb-10 text-center sm:text-left">
                                <div className="flex items-center justify-center sm:justify-start gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">
                                    <Sparkles size={16} />
                                    <span>Identity Settings</span>
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                                    Personalize Profile
                                </h3>
                            </header>

                            <div className="flex flex-col items-center mb-12">
                                <div className="relative group">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className={`h-28 w-28 rounded-4xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 ring-2 transition-all 
                                            ${getError('image') ? 'ring-rose-500' : 'ring-slate-100'}`}
                                    >
                                        <img
                                            src={preview || user?.image || `https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff`}
                                            className="w-full h-full object-cover"
                                            alt="Profile preview"
                                        />
                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300">
                                            <Camera size={24} />
                                            <span className="text-[10px] font-black uppercase mt-1">Change</span>
                                        </div>
                                    </motion.div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                                {getError('image') && (
                                    <p className="text-[11px] text-rose-500 mt-3 font-bold italic">{getError('image')}</p>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Display Name
                                    </label>
                                    <div className="relative group">
                                        <UserIcon className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors 
                                            ${getError('name') ? 'text-rose-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`}
                                            size={18}
                                        />
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl text-sm outline-none transition-all
                                                ${getError('name') ? 'border-rose-200 focus:ring-4 focus:ring-rose-500/10' : 'border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}`}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    {getError('name') && <p className="text-[11px] text-rose-500 ml-1 font-bold">{getError('name')}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors 
                                            ${getError('email') ? 'text-rose-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`}
                                            size={18}
                                        />
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl text-sm outline-none transition-all
                                                ${getError('email') ? 'border-rose-200 focus:ring-4 focus:ring-rose-500/10' : 'border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}`}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    {getError('email') && <p className="text-[11px] text-rose-500 ml-1 font-bold">{getError('email')}</p>}
                                </div>
                            </div>

                            <div className="flex gap-4 mt-12">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isPending}
                                    className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isPending}
                                    className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-indigo-600 shadow-xl shadow-slate-200 hover:shadow-indigo-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isPending ? (
                                        <Loader2 className="animate-spin" size={18} />
                                    ) : (
                                        'Update Profile'
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}