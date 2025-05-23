import React, { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from "../Pages/Login";
import AppRoutes from "./Routes";

function RouteProvider() {
  const { auth } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        {auth.islogin ? (
          <Route path="/" element={<Layout />}>
            {AppRoutes.map(({ path, Component }, index) => (
              <Route key={index} path={path} element={<Component />} />
            ))}
          </Route>
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
}

export default RouteProvider;
