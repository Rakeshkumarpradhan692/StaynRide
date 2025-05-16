import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import AppRoutes from "./Routes";

function RouteProvider() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {AppRoutes.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}

export default RouteProvider;
