/* eslint-disable react-refresh/only-export-components */
import { authenticate, signIn, signUp } from "@shared/api/auth";
import type { LoginData, SignUpData, User } from "@shared/types/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (data: LoginData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if user is logged in
  useEffect(() => {
    authenticationHandler().finally(() => setLoading(false));
  }, []);

  const authenticationHandler = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const user = await authenticate({ token });
      setUser(user);
    } catch (err) {
      console.error("Authentication failed", err);
      localStorage.removeItem("authToken");
      setUser(null);
    }
  };
  const signInHandler = async (data: LoginData) => {
    const token = await signIn(data);
    localStorage.setItem("authToken", token.token);

    authenticationHandler();
  };

  const signUpHandler = async (data: SignUpData) => {
    const token = await signUp(data);
    localStorage.setItem("authToken", token.token);

    authenticationHandler();
  };

  const signOutHandler = async () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: signInHandler,
        signUp: signUpHandler,
        signOut: signOutHandler,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
