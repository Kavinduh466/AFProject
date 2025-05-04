import { createContext, useContext, useEffect, useState } from 'react';
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

const HASHED_PASSWORD = '$2a$12$MlX0I1jOUD2QuQGRn6V1ae8gOlum5y00ooLNO0S43R3tVqJSrewhG';
const USERNAME = 'kavindu';
const SESSION_KEY = 'worldExplorerSession';
const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hour

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));
    if (session && session.expiresAt > Date.now()) {
      setIsLoggedIn(true);
      setUser({ username: session.username });
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  const login = async (username, password) => {
    const isUserMatch = username === USERNAME;
    const isPassMatch = await bcrypt.compare(password, HASHED_PASSWORD);

    if (isUserMatch && isPassMatch) {
      const session = {
        username,
        expiresAt: Date.now() + SESSION_DURATION_MS,
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setUser({ username });
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
