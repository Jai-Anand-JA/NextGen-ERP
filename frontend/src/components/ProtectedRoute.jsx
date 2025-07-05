import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore.js'; // Adjust the path as needed
const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, userrole} = useAuthStore();



  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (role && userrole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;