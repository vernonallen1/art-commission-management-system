import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoutes.jsx';

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/login" 
          element={<Login />}
        />
        <Route 
          path="/register" 
          element={<RegisterAndLogout />}
        />
        <Route
          path="*" 
          element={<NotFound />}
        />
        <Route 
          path="/logout"
          element={<Logout />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
