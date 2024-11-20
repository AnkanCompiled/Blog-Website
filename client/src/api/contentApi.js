import axios from "axios";
const URL = import.meta.env.VITE_BACKEND_URL;

export const contentPostsApi = async (data) => {
  try {
    const response = await axios.get(`${URL}/api/content/posts`);
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    return error.status;
  }
};

export const contentDetailsApi = async (user_id, post_id) => {
  try {
    const response = await axios.post(`${URL}/api/content/details`, {
      user_id: user_id,
      post_id: post_id,
    });
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    return error.status;
  }
};

export const contentImageApi = async (link) => {
  //   try {
  //     const response = await axios.get(`${URL}/api/content/image/${link}`);
  //     const result = response.data;
  //     console.log(result);
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //     return error.status;
  //   }
};
