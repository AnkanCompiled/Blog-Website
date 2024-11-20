import axios from "axios";
const URL = import.meta.env.VITE_BACKEND_URL;

export const generateOTP = async (email) => {
  await axios.post(`${URL}/api/otp/genrate`, { email: email });
};

export const verifyOTP = async (email, inputOtp) => {
  try {
    const info = { email: email, input: inputOtp };
    const response = await axios.post(`${URL}/api/otp/verify`, info);
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    return error.status;
  }
};

export const registerUser = async (info) => {
  try {
    const response = await axios.post(`${URL}/api/users/register`, info);
    const result = response.data;
    return result.message;
  } catch (error) {
    return error.status;
  }
};

export const loginUser = async (info) => {
  try {
    const response = await axios.post(`${URL}/api/users/login`, info);
    const result = response.data;
    return result.message;
  } catch (error) {
    return error.status;
  }
};
