import { StoredUserData } from '@types/auth';

const TOKEN_KEY = 'sd_token';
const USER_KEY = 'sd_user';

// Cache em memória para maior segurança
let memoryCache: {
  token: string | null;
  user: StoredUserData | null;
} = {
  token: null,
  user: null
};

export const storage = {
  setToken(token: string): void {
    if (!token || typeof token !== 'string') {
      throw new Error('Token inválido');
    }
    
    memoryCache.token = token;
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken(): string | null {
    return memoryCache.token ?? localStorage.getItem(TOKEN_KEY);
  },

  setUser(userData: StoredUserData): void {
    if (!userData || typeof userData !== 'object') {
      throw new Error('Dados de usuário inválidos');
    }
    
    // Remove dados sensíveis
    const { password, token, ...safeData } = userData as Record<string, unknown>;
    
    memoryCache.user = safeData as StoredUserData;
    localStorage.setItem(USER_KEY, JSON.stringify(safeData));
  },

  getUser(): StoredUserData | null {
    try {
      if (memoryCache.user) return memoryCache.user;
      
      const stored = localStorage.getItem(USER_KEY);
      return stored ? (JSON.parse(stored) as StoredUserData) : null;
    } catch {
      return null;
    }
  },

  clearAuth(): void {
    memoryCache.token = null;
    memoryCache.user = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};
