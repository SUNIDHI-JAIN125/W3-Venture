"use client";
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null); // Start with null
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Start with false

  useEffect(() => {
    // Check localStorage when component mounts
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true); // Assuming if there's a token, the user is authenticated
    }
  }, []);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (!token) return false; // No token means not authenticated

      // If using JWT, decode the token and check its expiry
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = Date.now() >= payload.exp * 1000;

      return !isExpired;
    };

    setIsAuthenticated(checkTokenValidity());
  }, [token]);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    setToken(token);
    setIsAuthenticated(true); // Update authentication status
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
