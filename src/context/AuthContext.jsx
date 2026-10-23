import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('blowmaggy-user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('blowmaggy-user', JSON.stringify(userData));
  }, []);

  const loginWithGoogle = useCallback(() => {
    // Simulate Google OAuth - in production, use Firebase Auth or similar
    const mockUser = {
      id: 'user_' + Date.now(),
      name: 'Vibe Coder',
      email: 'vibecoder@gmail.com',
      avatar: 'https://lh3.googleusercontent.com/a/default-user',
      provider: 'google',
      loginAt: new Date().toISOString(),
    };
    login(mockUser);
  }, [login]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('blowmaggy-user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
