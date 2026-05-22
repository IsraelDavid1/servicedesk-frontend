import { UserRole } from './enums';

export interface AuthenticationDTO {
  userLogin: string;
  password: string;
}

export interface RegisterDTO {
  userLogin: string;
  password: string;
  departament: string;
}

export interface LoginResponseDTO {
  token: string;
}

export interface UserResponseDTO {
  id: string;
  login: string;
  department: string;
  role: UserRole;
}

export interface AuthContextType {
  user: UserResponseDTO | null;
  loading: boolean;
  error: string | null;
  login: (credentials: AuthenticationDTO) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

export interface StoredUserData {
  id: string;
  login: string;
  department: string;
  role: UserRole;
}
