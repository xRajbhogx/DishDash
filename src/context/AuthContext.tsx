import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const value = await AsyncStorage.getItem('@auth_user');
        if (value) {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error('Failed to load auth state', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuthState();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) {
      alert('Please fill in both fields.');
      return false;
    }
    try {
      await AsyncStorage.setItem('@auth_user', email);
      setIsAuthenticated(true);
      return true;
    } catch (e) {
      console.error('Failed to set login auth state', e);
      return false;
    }
  };

  const signUp = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return false;
    }
    try {
      await AsyncStorage.setItem('@auth_user', email);
      setIsAuthenticated(true);
      return true;
    } catch (e) {
      console.error('Failed to set sign up auth state', e);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('@auth_user');
      setIsAuthenticated(false);
    } catch (e) {
      console.error('Failed to clear auth state during logout', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
