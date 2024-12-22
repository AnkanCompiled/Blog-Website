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

export const fetchPostApi = async (token, skip) => {
  try {
    const response = await axios.get(`${URL}/bloggerNet/post`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        skip: skip,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error during fetching posts:",
      error.response ? error.response.data : error.message
    );
    return error?.response;
  }
};

export const likePostApi = async (token, postId, value) => {
  try {
    const response = await axios.post(
      `${URL}/bloggerNet/post/likes`,
      {
        postId: postId,
        value: value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error during fetching image:",
      error.response ? error.response.data : error.message
    );
    return error?.status;
  }
};

export const fetchCommentsApi = async (token, postId) => {
  try {
    const response = await axios.post(
      `${URL}/bloggerNet/comment`,
      { postId: postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error during fetching comment data:",
      error.response ? error.response.data : error.message
    );
    return error?.response;
  }
};

export const uploadCommentApi = async (token, postId, comment) => {
  try {
    const response = await axios.post(
      `${URL}/bloggerNet/comment/upload`,
      {
        postId: postId,
        comment: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
    console.log("response", response.data);
  } catch (error) {
    console.error(
      "Error commenting:",
      error.response ? error.response.data : error.message
    );
    return error?.status;
  }
};
