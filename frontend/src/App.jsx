import { Routes, Route } from 'react-router-dom';
import FeedPage from './pages/posts/FeedPage';
import LoginPage from './pages/auth/LoginPage';
import AuthLayout from './layouts/AuthLayout';
import { AuthProvider } from './providers/AuthProvider';
import SignupPage from './pages/auth/SignupPage';
import PostFormPage from './pages/posts/PostFormPage';
import AppLayout from './layouts/AppLayout';
import PostDetailsPage from './pages/posts/PostDetailsPage';
import ProfilePage from './pages/user/ProfilePage';
import { queryClient } from './providers/QueryClientProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthHydrator } from './providers/AuthHydrator';

function App() {

  return (
    <QueryClientProvider client={queryClient}>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          bottom: 40,
          right: 40,
        }}
      />

      <AuthProvider>
        <AuthHydrator>
          <Routes>

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            <Route element={<AppLayout />}>
              <Route path="/" element={<FeedPage />} />

              <Route path="/posts/:id" element={<PostDetailsPage />} />
              <Route path="/posts/create" element={<PostFormPage />} />
              <Route path="/posts/edit/:id" element={<PostFormPage />} />

              <Route path="/profile" element={<ProfilePage />} />
            </Route>

          </Routes>
        </AuthHydrator>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App