
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserProfile } from '../types'; // Assuming UserProfile might be used later

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null; // Placeholder for user data
  login: (email: string, pass: string) => Promise<boolean>; // Simulate async login
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Check for persisted login state, e.g., from localStorage
    const storedAuth = localStorage.getItem('isAngolaCompanyAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      // Potentially load user data here too
      setUser({ id: 'mockUser', email: 'user@example.com', name: 'Usuário Logado', role: 'company_representative' });
    }
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'empresa@angola.com' && pass === 'password') { // Mock credentials
          setIsAuthenticated(true);
          setUser({ id: 'mockUser', email: email, name: 'Empresa Teste', role: 'company_representative' });
          localStorage.setItem('isAngolaCompanyAuthenticated', 'true');
          resolve(true);
        } else if (email === 'admin@angola.com' && pass === 'adminpass') {
          setIsAuthenticated(true);
          setUser({ id: 'mockAdmin', email: email, name: 'Administrador', role: 'admin' });
          localStorage.setItem('isAngolaCompanyAuthenticated', 'true');
          resolve(true);
        }
        else {
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAngolaCompanyAuthenticated');
    // Navigate to home or login page might be handled in component calling logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
