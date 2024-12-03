import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const GuestRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

export default GuestRoute;
