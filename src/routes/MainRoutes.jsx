import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import ProductList from "../components/ProductList";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProductList />} />
    </Routes>
  );
};

export default MainRoutes;
