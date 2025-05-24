import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState({
    isLoggedIn: false,
    user: null,
  });

  const updateUser = (userdata) => {
    localStorage.setItem("user", JSON.stringify(userdata));
    setAuth((prev) => ({
      ...prev,
      user: userdata,
    }));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuth({
        isLoggedIn: true,
        user: JSON.parse(storedUser),
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ Auth, setAuth, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
