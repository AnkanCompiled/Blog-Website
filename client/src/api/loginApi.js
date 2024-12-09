import axios from "axios";
const URL = import.meta.env.VITE_BACKEND_URL;

export const registerApi = async (email, password) => {
  try {
    const data = { email: email, password: password };
    const response = await axios.post(`${URL}/users/register`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error during registration:",
      error.response ? error.response.data : error.message
    );
    return error?.response?.status;
  }
};

export const loginApi = async (email, password) => {
  try {
    const data = { email: email, password: password };
    const response = await axios.post(`${URL}/users/login`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error during login:",
      error.response ? error.response.data : error.message
    );
    return error?.response?.status;
  }
};
