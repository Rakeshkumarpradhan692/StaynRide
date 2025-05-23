import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    islogin: false,
    admin: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    if (storedUser) {
      setAuth({ islogin: true, adminuser: JSON.parse(storedUser) });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("admin");
    setAuth({ islogin: false, admin: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
