import { useContext } from 'react';
import { AuthContext } from '@context/AuthContext';
import { AuthContextType } from '@models';

/**
 * Hook tipado para acesso ao contexto de autenticação
 * 
 * @example
 * function MyComponent() {
 *   const { user, logout, hasRole } = useAuth();
 *   
 *   if (!hasRole(UserRole.ADMIN)) return null;
 *   
 *   return <button onClick={() => logout()}>Sair</button>;
 * }
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error(
      'useAuth deve ser utilizado dentro de um AuthProvider. ' +
      'Certifique-se de envolver sua aplicação com <AuthProvider>.'
    );
  }
  
  return context;
};
