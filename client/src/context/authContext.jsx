import React, { createContext, useContext, useState, useEffect } from "react";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";
import PageLoadingComponent from "../components/PageLoadingComponent";
import { getUserApi } from "../api/accountApi";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [verifiedError, setVerifiedError] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const userInfo = async (token) => {
    if (!token) return;
    const result = await getUserApi(token);
    setUserDetails(result);
    if (!result?.verified) {
      setVerifiedError(true);
    } else {
      setVerifiedError(false);
    }
  };

  // Check website containing cookie
  useEffect(() => {
    const token = getCookie("authToken");
    if (token) {
      setIsAuthenticated(true);
      userInfo(token);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  // Log in the user by setting the cookie

  const notVerified = () => {
    setVerifiedError(true);
  };

  const login = (token) => {
    setCookie("authToken", token, { secure: true });
    setIsAuthenticated(true);
    userInfo(token);
  };

  // Log out the user by removing the cookie
  const logout = () => {
    removeCookie("authToken");
    setIsAuthenticated(false);
  };

  // Provide the auth state and functions to the rest of the app
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        verifiedError,
        notVerified,
        userDetails,
        userInfo,
      }}
    >
      {!isLoading ? children : <PageLoadingComponent />}
    </AuthContext.Provider>
  );
};
