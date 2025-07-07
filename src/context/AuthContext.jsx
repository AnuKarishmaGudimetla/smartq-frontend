import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const { sub: username, role } = jwtDecode(storedToken);
        return { username, role };
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = (token, userInfo) => {
  localStorage.setItem("token", token);
  setToken(token);
  setUser(userInfo);
};


  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 
