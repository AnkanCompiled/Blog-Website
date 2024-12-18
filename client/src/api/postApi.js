import axios from "axios";
const URL = import.meta.env.VITE_BACKEND_URL;

export const uploadApi = async (token, formData) => {
  try {
    const response = await axios.post(
      `${URL}/bloggerNet/post/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.status;
  } catch (error) {
    console.error(
      "Error during uploading:",
      error.response ? error.response.data : error.message
    );
    return error?.response?.status;
  }
};

export const fetchPostApi = async (token) => {
  try {
    const response = await axios.get(`${URL}/bloggerNet/post`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error during uploading:",
      error.response ? error.response.data : error.message
    );
    return error?.response;
  }
};
