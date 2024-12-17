import postModel from "../model/postModel.js";

export const uploadDb = async (data) => {
  const newPost = new postModel(data);
  const result = await newPost.save();
  return result._id;
};
