import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const IrrelevantRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
};
