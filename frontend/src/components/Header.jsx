import { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, LogOut, ChevronDown, Bell, Sparkles, FunnelXIcon } from 'lucide-react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/auth/useAuth';
import { setReturnUrl } from '../utils/returnUrlManager';
import { APP_CONSTANTS } from '../utils/appConstants';

export default function Header() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const [searchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(() => searchParams.get('q') || '');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        setIsMenuOpen(false)
        setReturnUrl();
        const location = window.location.href;
        navigate(`/login?redirect=${location}`);
    };

    const searchFeeds = () => {
        const params = new URLSearchParams(searchParams);

        if (searchValue.trim()) {
            params.set('q', searchValue.trim());
        } else {
            params.delete('q');
        }

        navigate({
            pathname: '/',
            search: params.toString(),
        });
    }

    const handleSearch = (e) => {
        e.preventDefault();
        searchFeeds();
    };

    const handleClear = () => {
        setSearchValue('')
        searchFeeds();
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
            <div className="w-full mx-auto px-6 h-20 flex justify-between items-center">

                <div className="flex items-center gap-10">
                    <Link to="/" className="group">
                        <motion.h1
                            whileHover={{ scale: 1.02 }}
                            className="text-2xl font-black tracking-tighter bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:to-violet-500 transition-all"
                        >
                            {APP_CONSTANTS.BUSINESS_NAME}
                        </motion.h1>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
                        <Link to="/" className={`${location.pathname === '/' ? 'text-indigo-600' : 'hover:text-slate-900'} transition-colors`}>Feed</Link>
                        <button className="hover:text-slate-900 transition-colors cursor-not-allowed">Trending</button>
                        <button className="hover:text-slate-900 transition-colors cursor-not-allowed">Explore</button>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <form onSubmit={handleSearch} className="hidden relative sm:flex items-center bg-slate-100/80 rounded-2xl px-4 py-2.5 w-72 border border-transparent focus-within:border-indigo-200 focus-within:bg-white focus-within:shadow-sm transition-all group">
                        <Search size={18} className="text-slate-400 group-focus-within:text-indigo-500" />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search articles, tags..."
                            className="bg-transparent border-none outline-none text-sm ml-2 w-full placeholder:text-slate-400"
                        />
                        {
                            searchValue &&
                            <button type='button' className='absolute right-0 pr-2 pl-2 h-full p-0.5 my-1 bg-white z-3 text-slate-500 hover:text-slate-700 cursor-pointer' onClick={handleClear}>
                                <FunnelXIcon size={12} />
                            </button>
                        }
                    </form>


                    {!user ? (
                        <Link
                            to="/login"
                            className="px-6 py-2.5 rounded-2xl text-sm font-bold bg-slate-900 text-white hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 hover:shadow-indigo-100"
                        >
                            Sign In
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                            </button>

                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center gap-2 p-1 rounded-2xl hover:bg-slate-100 transition-all"
                                >
                                    <div className="h-10 w-10 rounded-xl overflow-hidden border-2 border-white shadow-sm bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                        {user.image ? (
                                            <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                                        ) : (
                                            user.name.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {isMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-3 w-64 bg-white rounded-4xl shadow-2xl shadow-indigo-200/40 border border-slate-100 overflow-hidden p-2"
                                        >
                                            <div className="px-4 py-4 border-b border-slate-50 mb-2">
                                                <p className="text-sm font-black text-slate-900">{user.name}</p>
                                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                            </div>

                                            <div className="space-y-1">
                                                <MenuLink onClick={() => setIsMenuOpen(false)} icon={<User size={16} />} label="My Profile" to="/profile" />

                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors mt-2"
                                                >
                                                    <LogOut size={16} />
                                                    Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

function MenuLink({ icon, label, to, onClick }) {
    return (
        <Link
            onClick={onClick}
            to={to}
            className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all group"
        >
            <span className="text-slate-400 group-hover:text-indigo-500">{icon}</span>
            {label}
        </Link>
    );
}