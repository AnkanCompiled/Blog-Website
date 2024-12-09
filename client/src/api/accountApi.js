import axios from "axios";
const URL = import.meta.env.VITE_BACKEND_URL;

export const getUser = async (token) => {
  try {
    const response = await axios.get(`${URL}/blog/user/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error during fetching user:",
      error.response ? error.response.data : error.message
    );
    return error?.response?.status;
  }
};
