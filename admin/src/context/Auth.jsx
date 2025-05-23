import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    islogin: false,
    user: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuth({ islogin: true, user: JSON.parse(storedUser) });
    }
  }, []);
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setAuth({ islogin: true, user: userData });
  };
  const logout = () => {
    localStorage.removeItem("user");
    setAuth({ islogin: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
