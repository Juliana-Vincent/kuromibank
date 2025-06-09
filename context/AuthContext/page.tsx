'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const storedUser = localStorage.getItem('loggedInUser');
  if (storedUser) setUser(storedUser);
  setLoading(false);
}, []);

  const login = (username: string) => {
    setUser(username);
    localStorage.setItem('loggedInUser', username);
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser'); 
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
