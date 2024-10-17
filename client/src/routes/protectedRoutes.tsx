import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
