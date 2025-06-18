import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/user/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import CommissionForm from "./pages/user/CommissionForm.jsx";
import AdminHomepage from "./pages/admin/AdminHomepage.jsx";
import AdminRoute from "./components/admin/AdminRoute.jsx";
import Commissions from "./pages/admin/commissions/Commissions.jsx";
import Products from "./pages/admin/Products.jsx";
import Logs from "./pages/admin/Logs.jsx";
import ViewCommission from "./pages/admin/commissions/ViewCommission.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Commission from "./pages/user/Commission.jsx";

const userRoutes = [
  { path: "/", element: <Home /> },
  { path: "/book-commission", element: <CommissionForm /> },
  { path: "/commission", element: <Commission /> },
];

const adminRoutes = [
  { path: "/admin", element: <AdminHomepage /> },
  { path: "/commissions", element: <Commissions /> },
  { path: "/products", element: <Products /> },
  { path: "/logs", element: <Logs /> },
  { path: "/commissions/:id", element: <ViewCommission /> },
];

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Routes>
        {userRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute>{element}</ProtectedRoute>}
          />
        ))}
        {adminRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<AdminRoute>{element}</AdminRoute>}
          />
        ))}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
