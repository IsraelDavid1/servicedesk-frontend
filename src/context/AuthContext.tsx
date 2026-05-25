import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useMemo
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import * as AuthService from '@services/AuthService';
import { storage } from '@services/StorageService';
import { AuthContextType, UserResponseDTO, UserRole, AuthenticationDTO } from '@types';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        if (storage.isAuthenticated()) {
          const userData = await AuthService.validateSession();
          setUser(userData);
          storage.setUser(userData);
        }
      } catch (err) {
        storage.clearAuth();
        console.log('Sessão inválida, requer login');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials: AuthenticationDTO): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      if (!credentials?.userLogin || !credentials?.password) {
        throw new Error('Login e senha são obrigatórios');
      }

      const response = await AuthService.login(credentials);
      
      storage.setToken(response.token);
      const userData = await AuthService.validateSession();
      setUser(userData);
      storage.setUser(userData);

      toast.success('Login realizado com sucesso!');
      navigate('/dashboard', { replace: true });
      
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error 
        ? err.message 
        : 'Falha ao realizar login';
      setError(message);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await AuthService.logout().catch(() => {});
    } finally {
      storage.clearAuth();
      setUser(null);
      toast.success('Logout realizado com sucesso!');
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const hasRole = useCallback((roles: UserRole | UserRole[]): boolean => {
    if (!user?.role) return false;
    
    const userRole = user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    return allowedRoles.includes(userRole);
  }, [user]);

  const value = useMemo<AuthContextType>(() => ({
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole
  }), [user, loading, error, login, logout, hasRole]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
