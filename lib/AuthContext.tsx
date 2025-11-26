'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  email: string;
  name: string;
  exp?: number;
  iat?: number;
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      // ⭐ Detect Guest Token on page refresh
      if (storedToken === "guest_token_123") {
        setToken(storedToken);
        setUser({ name: "Guest User", email: "guest@example.com" });
        setLoading(false);
        return;
      }

      // ⭐ Normal JWT users
      try {
        const decoded = jwt.decode(storedToken) as DecodedToken | null;

        if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
        } else if (decoded) {
          setToken(storedToken);
          setUser(decoded);
        }
      } catch {
        localStorage.removeItem('token');
      }
    }

    setLoading(false);
  }, []);

  const login = (newToken: string) => {
    try {
      // ⭐ Guest Login
      if (newToken === "guest_token_123") {
        localStorage.setItem("token", newToken);
        setUser({ name: "Guest User", email: "guest@example.com" });
        setToken(newToken);
        return;
      }

      // ⭐ Normal JWT Login
      const decoded = jwt.decode(newToken) as DecodedToken | null;

      if (decoded) {
        localStorage.setItem("token", newToken);
        setUser(decoded);
        setToken(newToken);
      }
    } catch {
      console.error("Invalid token on login.");
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    router.push('/signin');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
