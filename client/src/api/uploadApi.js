import axios from "axios";
import { getCookie } from "../util/cookieUtil";
const URL = import.meta.env.VITE_BACKEND_URL;

export const uploadApi = async (data) => {
  try {
    const token = getCookie("user");
    const response = await axios.post(`${URL}/api/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    return error.status;
  }
};
