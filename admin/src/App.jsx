import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import UserManagement from "./components/UserManagement";
import ProductManagement from "./components/ProductManagement";
import EditProduct from "./components/EditProduct";
import OrderManagement from "./components/OrderManagement";
import AdminLayout from "./components/AdminLayout";
import Login from "./pages/Login";
import { adminDataContext } from "./context/AdminContext";
import ProductAdd from "./components/ProductAdd";
import { Toaster } from 'sonner';

const App = () => {
  const { adminData } = useContext(adminDataContext);

  return (
    <>

     <Toaster position="top-right"/>
    
    <Routes>
      {/* Login Page → if already logged in, redirect to admin */}
      <Route
        path="/login"
        element={!adminData ? <Login /> : <Navigate to="/" replace />}
      />

      {/* Protected Admin Routes */}
      <Route
        path="/"
        element={adminData ? <AdminLayout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Home />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="adproduct" element={<ProductAdd />} />
        <Route path="products/:id/edit" element={<EditProduct />} />
        <Route path="orders" element={<OrderManagement />} />
      </Route>

      {/* Fallback: redirect everything else */}
      <Route
        path="*"
        element={<Navigate to={adminData ? "/" : "/login"} replace />}
      />
    </Routes>
    </>
  );
};

export default App;
