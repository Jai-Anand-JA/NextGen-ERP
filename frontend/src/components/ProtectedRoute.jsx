// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore'; // adjust path as needed

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, userrole } = useAuthStore();


  if (role && userrole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
