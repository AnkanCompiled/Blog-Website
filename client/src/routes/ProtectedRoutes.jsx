import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { getCookie } from "../util/cookieUtil";
import LoadingComponent from "../components/loadingComponent";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = getCookie("user");
    if (token) {
      setIsAuthenticated(true);
    }
    setAuthChecked(true);
  });

  if (!authChecked) {
    return <LoadingComponent />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
