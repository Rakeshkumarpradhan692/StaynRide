import React, { createContext, memo, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setauth] = useState({
    islogin: false,
    admin: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    if (storedUser) {
      setauth({ islogin: true, admin: JSON.parse(storedUser) });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("admin");
    setauth({ islogin: false, admin: null });
  };

  const updateAdmin = (updatedAdmin) => {
    const newAuth = {
      ...auth,
      admin: updatedAdmin,
    };
    setauth(newAuth);
    localStorage.setItem("admin", JSON.stringify(updatedAdmin));
  };

  return (
    <AuthContext.Provider value={{ auth, setauth, logout, updateAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default memo(AuthProvider);
