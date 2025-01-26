import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ roles, children }) => {
  const storedRoles = JSON.parse(localStorage.getItem("roles"));

  if (!storedRoles) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = roles.some((role) => storedRoles.includes(role));

  return hasAccess ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
