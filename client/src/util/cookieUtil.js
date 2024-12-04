import Cookies from "js-cookie";

export const setCookie = (key, value, options = {}) => {
  const defaultOptions = {
    expires: 7,
    secure: import.meta.env.VITE_COOKIE_SECURE === "production",
    sameSite: "Strict",
  };
  Cookies.set(key, value, { ...defaultOptions, ...options });
};

export const getCookie = (key) => {
  return Cookies.get(key) || null;
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};

export const getAllCookies = () => {
  return Cookies.get();
};
