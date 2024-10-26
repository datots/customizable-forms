import React, { createContext, useContext, useState } from "react";

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component to wrap the application and provide user data
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to set user data
  const login = (userData) => {
    setUser(userData);
  };

  // Function to clear user data
  const logout = () => {
    setUser(null);
  };

  // Function to update user data
  const updateUser = (updatedData) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedData }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
