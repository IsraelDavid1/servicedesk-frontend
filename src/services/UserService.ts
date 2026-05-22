import api from "../api/axios";
import type { Auth, AuthResponse } from "../types/Authentication";
import type { Register } from "../types/Register";

export const login = async (loginData: Auth) => {
    const response = await api.post<AuthResponse>("/auth/login", loginData);
    return response.data;
};

export const register = async (registerData: Register) => {
    const response = await api.post("/auth/register", registerData);
    return response.data;
}

export const validateSession = async (): Promise<boolean> => {
    try {
        await api.get("/auth/validate");
        return true;
    } catch {
        localStorage.removeItem("token");
        return false;
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
};
