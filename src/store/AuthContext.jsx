import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// In production this would be a real auth check against your backend
const ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
