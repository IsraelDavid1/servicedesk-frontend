import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { sanitizeInput } from '@utils/security';
import './Login.module.css';
import { useEffect } from 'react';

interface LoginFormState {
  userLogin: string;
  password: string;
}

interface FormErrors {
  userLogin?: string;
  password?: string;
}

export default function LoginPage(): JSX.Element {
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';
  
  const [formData, setFormData] = useState<LoginFormState>({
    userLogin: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated()) {    
      navigate(from, { replace: true });
      return <></>;
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.userLogin.trim()) {
      newErrors.userLogin = 'Login é obrigatório';
    } else if (formData.userLogin.length < 3) {
      newErrors.userLogin = 'Login deve ter pelo menos 3 caracteres';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizeInput(value)
    }));
    
    // Limpa erro do campo ao digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const success = await login({
      userLogin: formData.userLogin.trim(),
      password: formData.password
    });
    
    if (success) {
      const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <header className="login-header">
          <h1>Service Desk</h1>
          <p>Sistema Corporativo de Chamados</p>
        </header>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <Input
            label="Login"
            name="userLogin"
            type="text"
            value={formData.userLogin}
            onChange={handleChange}
            error={errors.userLogin}
            placeholder="Digite seu login"
            autoComplete="username"
            autoFocus
            disabled={loading}
          />

          <Input
            label="Senha"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Digite sua senha"
            autoComplete="current-password"
            disabled={loading}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            Entrar
          </Button>
        </form>

        <footer className="login-footer">
          <p>
            <Link to="/register">Criar nova conta</Link>
          </p>
          <p className="login-footer__copyright">
            © {new Date().getFullYear()} Service Desk Corporate
          </p>
        </footer>
      </div>
    </div>
  );
}
