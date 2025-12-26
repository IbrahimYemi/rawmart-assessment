import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../hooks/auth/useAuth';

export default function AppLayout() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 max-w-360 mx-auto ">
            <Header />

            <main className="px-2 py-8 md:px-16 md:py-14">
                <Outlet />
            </main>
        </div>
    )
}