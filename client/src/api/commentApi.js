import axios from "axios";
const URL = import.meta.env.VITE_BACKEND_URL;

export const fetchCommentsApi = async (userId, postId) => {
  try {
    const response = await axios.post(`${URL}/bloggerNet/comment`, {
      id: userId,
      postId: postId,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error during fetching comment data:",
      error.response ? error.response.data : error.message
    );
    return error?.response;
  }
};

export const uploadCommentApi = async (data, postId, comment) => {
  try {
    const response = await axios.post(`${URL}/bloggerNet/comment/upload`, {
      user: data,
      postId: postId,
      comment: comment,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error commenting:",
      error.response ? error.response.data : error.message
    );
    return error?.status;
  }
};

export const likeCommentApi = async (id, commentId, value) => {
  try {
    const response = await axios.post(`${URL}/bloggerNet/comment/likes`, {
      id: id,
      commentId: commentId,
      value: value,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error liking comment:",
      error.response ? error.response.data : error.message
    );
    return error?.status;
  }
};

export const fetchRepliesApi = async (userId, commentId) => {
  try {
    const response = await axios.post(`${URL}/bloggerNet/comment/replies`, {
      id: userId,
      commentId: commentId,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error during fetching replies data:",
      error.response ? error.response.data : error.message
    );
    return error?.response;
  }
};

export const uploadReplyApi = async (data, commentId, reply) => {
  try {
    const response = await axios.post(`${URL}/bloggerNet/comment/uploadReply`, {
      user: data,
      commentId: commentId,
      reply: reply,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error commenting:",
      error.response ? error.response.data : error.message
    );
    return error?.status;
  }
};
