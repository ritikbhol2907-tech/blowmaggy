import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Demo user accounts with different roles
const DEMO_USERS = {
  user: { id: 'user1', name: 'Priya Sharma', email: 'priya@blowmaggy.com', password: 'user123', role: 'customer', avatar: 'https://i.pravatar.cc/150?img=1', points: 2450, membership: 'Gold', addresses: [{ name: 'Home', line1: '42 MG Road', line2: 'Koramangala', city: 'Bangalore', state: 'Karnataka', zip: '560034', phone: '+91 98765 43210' }] },
  manager: { id: 'mgr1', name: 'Arjun Kapoor', email: 'manager@blowmaggy.com', password: 'manager123', role: 'manager', avatar: 'https://i.pravatar.cc/150?img=3', points: 0, membership: 'Manager', addresses: [] },
  employee: { id: 'emp1', name: 'Sneha Gupta', email: 'employee@blowmaggy.com', password: 'employee123', role: 'employee', avatar: 'https://i.pravatar.cc/150?img=5', points: 800, membership: 'Silver', addresses: [] },
};

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

  const loginWithEmail = useCallback((email, password) => {
    const demoUser = DEMO_USERS[email.split('@')[0]];
    if (demoUser && demoUser.password === password) {
      const { password: _, ...userWithoutPassword } = demoUser;
      login({ ...userWithoutPassword, loginAt: new Date().toISOString() });
      return true;
    }
    return false;
  }, [login]);

  const loginWithGoogle = useCallback(() => {
    const mockUser = { id: 'user_' + Date.now(), name: 'Vibe Coder', email: 'vibecoder@gmail.com', role: 'customer', avatar: 'https://i.pravatar.cc/150?img=12', points: 0, membership: 'Standard', addresses: [] };
    login(mockUser);
  }, [login]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('blowmaggy-user');
  }, []);

  const hasRole = useCallback((...roles) => {
    return user && roles.includes(user.role);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, loginWithEmail, loginWithGoogle, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
