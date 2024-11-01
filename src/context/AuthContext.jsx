import { createContext, useState, useEffect, useContext } from "react";
import { KJUR, b64utoutf8 } from "jsrsasign"; // Import necessary functions from jsrsasign
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      setUser(decoded);
    }
  }, []);

  const decodeJWT = (token) => {
    try {
      const payload = KJUR.jws.JWS.parse(token);
      return payload.payloadObj; // Return the payload object
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null; // Return null if decoding fails
    }
  };

  const register = async (userData) => {
    await axios.post("/api/auth/register", userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
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
