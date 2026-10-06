'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/auth';
import { apiClient } from '@/lib/api-client';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start as null on both server and client so SSR HTML matches client HTML (no hydration error).
  // The first client-side useEffect immediately reads localStorage and sets user synchronously
  // before the async /auth/me call, so there is no visible redirect flash on page reload.
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAuthMe = async () => {
    setIsLoading(true);
    try {
      // 1. Try to fetch authentic session user from backend API /auth/me
      const res = await apiClient.get('/auth/me');
      if (res.data?.success && res.data?.data?.user) {
        const fetchedUser: User = res.data.data.user;
        setUserState(fetchedUser);
        try {
          localStorage.setItem('mazna_user', JSON.stringify(fetchedUser));
        } catch (e) {}
        return;
      }
    } catch (err) {
      // If unauthenticated or backend offline, fall back to stored localStorage user
      try {
        const stored = localStorage.getItem('mazna_user');
        if (stored) {
          setUserState(JSON.parse(stored));
        } else {
          setUserState(null);
        }
      } catch (e) {
        setUserState(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Step 1 — synchronously restore from localStorage so auth guards never see null on reload.
    // This runs only on the client (after hydration), so SSR HTML stays null and matches.
    try {
      const stored = localStorage.getItem('mazna_user');
      if (stored) {
        setUserState(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
    // Step 2 — revalidate the session with the backend in the background.
    fetchAuthMe();
  }, []);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    try {
      if (newUser) {
        localStorage.setItem('mazna_user', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('mazna_user');
      }
    } catch (e) {
      console.error('Failed to save auth state to localStorage', e);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (e) {}
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        setUser,
        logout,
        refreshUser: fetchAuthMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
