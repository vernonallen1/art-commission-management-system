import React from 'react'
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
  const isSuperuser = localStorage.getItem("is_superuser") === "true"

  if (!isSuperuser) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute