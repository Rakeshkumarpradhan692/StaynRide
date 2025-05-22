// AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState({
    isLoggedIn: false,
    userData: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuth((prev) => ({
        ...prev,
        isLoggedIn: true,
        userData: JSON.parse(storedUser),
      }));
    }
  }, [Auth.isLoggedIn]);

  return (
    <AuthContext.Provider value={{ Auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
