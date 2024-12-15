import axios from "axios";
const URL = import.meta.env.VITE_BACKEND_URL;

export const getUserApi = async (token) => {
  try {
    const response = await axios.get(`${URL}/bloggerNet/user/data`, {
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

export const verifySendEmailApi = async (token) => {
  try {
    const response = await axios.get(`${URL}/users/email/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.status;
  } catch (error) {
    console.error(
      "Error during sending verify mail:",
      error.response ? error.response.data : error.message
    );
    return error?.response?.status;
  }
};

export const verifyUserApi = async (token) => {
  try {
    const response = await axios.get(`${URL}/users/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.status;
  } catch (error) {
    console.error(
      "Error during verifying user:",
      error.response ? error.response.data : error.message
    );
    return error?.response?.status;
  }
};

export const changeUserName = async (token, username) => {
  try {
    const response = await axios.post(
      `${URL}/bloggerNet/user/changeName`,
      { username: username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.status;
  } catch (error) {
    console.error(
      "Error during fetching user:",
      error.response ? error.response.data : error.message
    );
    return error?.response?.status;
  }
};
