import { useState } from 'react';
import { Lock } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useChangePassword } from '../hooks/useChangePassword.js';
import { notify } from '../../../components/Toast';

export function ChangePasswordModal({ isOpen, onClose }) {
    const { mutate: changePassword, isPending } = useChangePassword();

    // Local state for form inputs
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            notify.error('Validation Error', 'All fields are required');
            return;
        }
        if (newPassword !== confirmPassword) {
            notify.error('Validation Error', 'Passwords do not match');
            return;
        }

        changePassword(
            {
                current_password: oldPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
            },
            {
                onSuccess: () => {
                    notify.success('Password Updated', 'Password changed successfully');
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    onClose();
                },
                onError: (err) => {
                    notify.error('Error', err.response?.data?.message || 'Failed to update password');
                },
            }
        );
    };

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
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-md p-10"
                    >
                        <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-widest mb-4">
                            <Lock size={16} /> Security
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">
                            Update Password
                        </h3>

                        <div className="space-y-4">
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-rose-500 transition-all text-sm"
                            />
                            <div className="h-px bg-slate-100 my-2" />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 transition-all text-sm"
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 transition-all text-sm"
                            />
                        </div>

                        <div className="flex gap-3 mt-10">
                            <button
                                onClick={onClose}
                                className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isPending}
                                className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg disabled:opacity-50"
                            >
                                {isPending ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}