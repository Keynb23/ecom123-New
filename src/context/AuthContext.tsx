import React, { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'; 
import { auth } from '../lib/firebaseConfig'; 

export interface AuthState {
  isAuthenticated: boolean;
  user: FirebaseUser | null; 
}

export interface AuthContextType {
  authState: AuthState;
  login: (user: FirebaseUser) => void; 
  logout: () => void;
  loadingAuth: boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setAuthState({
          isAuthenticated: true,
          user: currentUser,
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
        });
      }
      setLoadingAuth(false); 
    });

    return () => unsubscribe();
  }, []);

  const login = (user: FirebaseUser) => {
    setAuthState({ isAuthenticated: true, user });
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
  };

  const value = {
    authState,
    login,
    logout,
    loadingAuth,
  };

  if (loadingAuth) {
    return <div>Loading authentication...</div>; // Or a proper spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};