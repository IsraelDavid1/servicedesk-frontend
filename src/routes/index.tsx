import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from '@context/AuthContext';
import { ProtectedRoute } from '@components/layout/ProtectedRoute';
import { Layout } from '@components/layout/Layout';
import { Toaster } from 'react-hot-toast';
import LoginPage from '@pages/Login/LoginPage';

const DashboardPage   = lazy(() => import('@pages/Dashboard/DashboardPage'));
const CallsListPage   = lazy(() => import('@pages/Calls/CallsListPage'));
const CallDetailsPage = lazy(() => import('@pages/Calls/CallDetailsPage'));
const CreateCallPage  = lazy(() => import('@pages/Calls/CreateCallPage'));
const ProfilePage     = lazy(() => import('@pages/Profile/ProfilePage'));
const ErrorPage       = lazy(() => import('@pages/Errors/ErrorPage'));
const NotFoundPage    = lazy(() => import('@pages/Errors/NotFoundPage'));
const RegisterPage    = lazy(() => import('@pages/Register/RegisterPage'));

function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: '#0f172a', color: '#94a3b8', fontSize: '14px',
    }}>
      Carregando...
    </div>
  );
}

// RootLayout: precisa ficar DENTRO do RouterProvider para que
// useNavigate() funcione dentro do AuthContext
function RootLayout() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#1e293b', color: '#f1f5f9', borderRadius: '8px', border: '1px solid #334155' },
          success: { duration: 3000, icon: '✅' },
          error: { duration: 5000, icon: '❌' },
        }}
      />
      <Outlet />
    </AuthProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/login',    element: <LoginPage /> },
      { path: '/register', element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense> },
      { path: '/',         element: <Navigate to="/login" replace /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                path: '/dashboard',
                element: <Suspense fallback={<PageLoader />}><DashboardPage /></Suspense>,
              },
              {
                path: '/calls',
                element: <Suspense fallback={<PageLoader />}><CallsListPage /></Suspense>,
              },
              {
                path: '/calls/:id',
                element: <Suspense fallback={<PageLoader />}><CallDetailsPage /></Suspense>,
              },
              {
                path: '/calls/new',
                element: <Suspense fallback={<PageLoader />}><CreateCallPage /></Suspense>,
              },
              {
                path: '/profile',
                element: <Suspense fallback={<PageLoader />}><ProfilePage /></Suspense>,
              },
            ],
          },
        ],
      },


      { path: '/error', element: <Suspense fallback={<PageLoader />}><ErrorPage /></Suspense> },
      { path: '*',      element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
    ],
  },
]);
