import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import React from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  const register = async (userData) => {
    // Registration logic can still be here if needed
    await axios.post("/api/auth/register", userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access to auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
