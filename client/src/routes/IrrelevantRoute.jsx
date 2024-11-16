import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { getCookie } from "../util/cookieUtil";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../components/loadingComponent";

export default function IrrelevantRoute({ children }) {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setAuthChecked(true);
  });

  if (!authChecked) {
    return <LoadingComponent />;
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
