import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useNavigate } from '@tanstack/react-router';

export function useAuthForm() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError('');
      await login(email, password);
      navigate({ to: '/' });
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email: string, name: string, password: string) => {
    try {
      setLoading(true);
      setError('');
      await register(email, name, password);
      navigate({ to: '/' });
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    login: handleLogin,
    register: handleRegister,
    loading,
    error,
  };
}
