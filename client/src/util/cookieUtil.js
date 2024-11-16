import Cookies from "js-cookie";

//setCookie('name', 'value', days, { path: '/', secure: true, sameSite: 'Strict'/'Lax'/'None' });
export const setCookie = (name, value, days, options = {}) => {
  Cookies.set(name, value, { expires: days, ...options });
};

export const getCookie = (name) => {
  return Cookies.get(name);
};

export const deleteCookie = (name) => {
  Cookies.remove(name);
};
