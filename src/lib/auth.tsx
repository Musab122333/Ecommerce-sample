import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authAPI } from './api/client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'ADMIN';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      // Verify token by fetching current user
      authAPI.me(storedToken)
        .then((response: any) => {
          setUser(response.data);
        })
        .catch(() => {
          // Token is invalid, clear it
          localStorage.removeItem('auth_token');
          setToken(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response: any = await authAPI.login({ email, password });
      const newToken = response.data.token;
      const newUser = response.data.user;
      
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('auth_token', newToken);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, name: string, password: string) => {
    try {
      const response: any = await authAPI.register({ email, name, password });
      const newToken = response.data.token;
      const newUser = response.data.user;
      
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('auth_token', newToken);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
