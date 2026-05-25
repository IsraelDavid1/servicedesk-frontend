import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { UserRole } from '@types/enums';
import { useAuth } from '@hooks/useAuth';
import LoadingSpinner from '@components/ui/LoadingSpinner';

interface ProtectedRouteProps {
  roles?: UserRole | UserRole[];
  redirectToLogin?: boolean;
  fallback?: React.ReactNode;
}

/**
 * Componente para proteger rotas com autenticação e autorização
 * 
 * @example
 * // Rota para qualquer usuário autenticado
 * <Route element={<ProtectedRoute />} />
 * 
 * // Rota apenas para ADMIN e TECH
 * <Route element={
 *   <ProtectedRoute roles={[UserRole.ADMIN, UserRole.TECH]} />
 * } />
 */
export const ProtectedRoute = ({ 
  roles = undefined, 
  redirectToLogin = true,
  fallback = null
}: ProtectedRouteProps): JSX.Element | null => {
  const { isAuthenticated, loading, hasRole } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-container" aria-live='polite' aria-label='Carregando'>
        <LoadingSpinner size="large" />
        <p>Carregando autenticação...</p>
      </div>
    );
  }

  if (!isAuthenticated()) {
    if (redirectToLogin) {
      return (
        <Navigate 
          to="/login" 
          state={{ from: location }} 
          replace 
        />
      );
    }
    return fallback;
  }

  if (roles && !hasRole(roles)) {
    return (
      <Navigate 
        to="/error" 
        state={{ 
          code: 403, 
          message: 'Você não tem permissão para acessar esta página.' 
        }} 
        replace 
      />
    );
  }

  return <Outlet />;
};
