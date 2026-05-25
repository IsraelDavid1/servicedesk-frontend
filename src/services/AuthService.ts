import api from '@api/axios';
import { sanitizeInput } from '@utils/security';
import {
  AuthenticationDTO,
  LoginResponseDTO,
  UserResponseDTO,
  RegisterDTO
} from '@types/auth';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  VALIDATE: '/auth/validate',
  LOGOUT: '/auth/logout'
} as const;

export const AuthService = {
  async login(credentials: AuthenticationDTO): Promise<LoginResponseDTO> {
    const sanitized: AuthenticationDTO = {
      userLogin: sanitizeInput(credentials.userLogin),
      password: credentials.password
    };
    
    const response = await api.post<LoginResponseDTO>(
      AUTH_ENDPOINTS.LOGIN, 
      sanitized, 
      { skipErrorHandling: true }
    );
    
    return response.data;
  },

  async register(userData: RegisterDTO): Promise<void> {
    const sanitized: RegisterDTO = {
      userLogin: sanitizeInput(userData.userLogin),
      password: userData.password,
      departament: sanitizeInput(userData.departament)
    };
    
    await api.post(AUTH_ENDPOINTS.REGISTER, sanitized);
  },

  async validateSession(): Promise<UserResponseDTO> {
    const response = await api.get<UserResponseDTO>(AUTH_ENDPOINTS.VALIDATE);
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.warn('Logout no backend falhou, prosseguindo com logout local');
    }
  },

  async refreshToken(): Promise<string | null> {
    // TODO: Implementar quando backend suportar refresh tokens
    return null;
  }
};
