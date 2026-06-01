import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthService } from '@/services/AuthService';

import './Register.css';

interface RegisterFormData {
  userLogin: string;
  password: string;
  confirmPassword: string;
  departament: string;
}

const initialForm: RegisterFormData = {
  userLogin: '',
  password: '',
  confirmPassword: '',
  departament: '',
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof RegisterFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    if (!formData.userLogin.trim()) {
      newErrors.userLogin = 'Login é obrigatório';
    }

    if (!formData.departament.trim()) {
      newErrors.departament = 'Departamento é obrigatório';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password =
        'A senha deve ter pelo menos 8 caracteres';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword =
        'Confirme sua senha';
    } else if (
      formData.confirmPassword !== formData.password
    ) {
      newErrors.confirmPassword =
        'As senhas não coincidem';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      await AuthService.register({
        userLogin: formData.userLogin,
        password: formData.password,
        departament: formData.departament,
      });

      toast.success('Conta criada com sucesso!');
      navigate('/login');
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Erro ao criar conta';

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1>Service Desk</h1>
            <p>Criar nova conta</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="register-form"
          >
            <div className="form-group">
              <label htmlFor="userLogin">
                Login
              </label>

              <input
                id="userLogin"
                name="userLogin"
                type="text"
                placeholder="Digite seu login"
                value={formData.userLogin}
                onChange={handleChange}
              />

              {errors.userLogin && (
                <span className="error-message">
                  {errors.userLogin}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="departament">
                Departamento
              </label>

              <input
                id="departament"
                name="departament"
                type="text"
                placeholder="Ex: TI, RH, Financeiro"
                value={formData.departament}
                onChange={handleChange}
              />

              {errors.departament && (
                <span className="error-message">
                  {errors.departament}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Senha
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleChange}
              />

              {errors.password && (
                <span className="error-message">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirmar Senha
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              {errors.confirmPassword && (
                <span className="error-message">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading
                ? 'Criando conta...'
                : 'Criar Conta'}
            </button>
          </form>

          <div className="register-footer">
            <span>Já possui uma conta?</span>

            <Link to="/login">
              Fazer Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
