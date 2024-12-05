import React, { createContext, useContext, useState, useEffect } from "react";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";
import PageLoadingComponent from "../components/PageLoadingComponent";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check website containing cookie
  useEffect(() => {
    const token = getCookie("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  // Log in the user by setting the cookie
  const login = (token) => {
    setCookie("authToken", token, { secure: true });
    setIsAuthenticated(true);
  };

  // Log out the user by removing the cookie
  const logout = () => {
    removeCookie("authToken");
    setIsAuthenticated(false);
  };

  // Provide the auth state and functions to the rest of the app
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {!isLoading ? children : <PageLoadingComponent />}
    </AuthContext.Provider>
  );
};
