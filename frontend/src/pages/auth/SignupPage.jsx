import { useState, useRef } from 'react';
import { User, Mail, Lock, Sparkles, Loader2, AlertCircle, ArrowRight, Camera, ImagePlus } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/auth/useRegister';
import { notify } from '../../components/Toast';

const SignupPage = () => {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { mutate: register, isPending } = useRegister();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            if (errors.image) setErrors(prev => ({ ...prev, image: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!formData.image) {
            setErrors({ image: ['An profile image is required'] });
            return;
        }

        if (formData.password?.length < 6) {
            setErrors({ password : ['Password must be at least 6 chars']})
            return;
        }

        if (formData.password !== formData.password_confirmation) {
            setErrors({ password : ['Password does not match']})
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('password_confirmation', formData.password_confirmation);
        data.append('image', formData.image);

        register(data, {
            onSuccess: () => {
                notify.success('Welcome!', 'Your account has been created.');
                navigate('/');
            },
            onError: (err) => {
                notify.error('Validation error', err.response?.data?.message );
            },
        });
    };

    const getError = (field) => errors[field]?.[0] || (field === 'general' ? errors.general : null);

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col items-center mb-8">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current.click()}
                    className={`relative cursor-pointer h-28 w-28 rounded-[2.5rem] flex items-center justify-center overflow-hidden border-2 border-dashed transition-all
                        ${getError('image') ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-indigo-400'}`}
                >
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center text-slate-400">
                            <Camera size={24} />
                            <span className="text-[10px] font-black uppercase tracking-widest mt-1">Upload</span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ImagePlus className="text-indigo-600" size={20} />
                    </div>
                </motion.div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                />

                {getError('image') && (
                    <p className="text-[10px] text-red-500 mt-2 font-bold uppercase tracking-wider italic">
                        {getError('image')}
                    </p>
                )}
            </div>

            <AnimatePresence>
                {getError('general') && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-2xl text-sm flex items-center gap-2"
                    >
                        <AlertCircle size={16} />
                        {getError('general')}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-1">
                <div className="relative group">
                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? 'text-red-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`} size={18} />
                    <input
                        type="text"
                        required
                        placeholder="Full Name"
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all text-sm 
                            ${errors.name ? 'border-red-200 focus:ring-4 focus:ring-red-500/10' : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}`}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                {errors.name && <p className="text-[11px] text-red-500 ml-4 font-medium italic">{errors.name[0]}</p>}
            </div>

            <div className="space-y-1">
                <div className="relative group">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`} size={18} />
                    <input
                        type="email"
                        required
                        placeholder="Email Address"
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all text-sm 
                            ${errors.email ? 'border-red-200 focus:ring-4 focus:ring-red-500/10' : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}`}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                {errors.email && <p className="text-[11px] text-red-500 ml-4 font-medium italic">{errors.email[0]}</p>}
            </div>

            <div className="space-y-1">
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative group">
                        <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`} size={18} />
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            className={`w-full pl-11 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all text-sm 
                                ${errors.password ? 'border-red-200 focus:ring-4 focus:ring-red-500/10' : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}`}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div className="relative group">
                        <input
                            type="password"
                            required
                            placeholder="Confirm"
                            className={`w-full px-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all text-sm 
                                ${errors.password ? 'border-red-200 focus:ring-4 focus:ring-red-500/10' : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}`}
                            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                        />
                    </div>
                </div>
                {errors.password && <p className="text-[11px] text-red-500 ml-4 font-medium italic">{errors.password[0]}</p>}
            </div>

            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isPending}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-70 group mt-2"
            >
                {isPending ? (
                    <Loader2 className="animate-spin" size={20} />
                ) : (
                    <>
                        Create Account
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </motion.button>

            <div className="text-center pt-4">
                <p className="text-sm text-slate-500 font-medium">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-indigo-600 font-black hover:text-indigo-700 transition-colors underline underline-offset-4 decoration-indigo-200 hover:decoration-indigo-500"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default SignupPage;