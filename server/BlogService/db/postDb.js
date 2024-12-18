import postModel from "../model/postModel.js";

export const uploadDb = async (data) => {
  const newPost = new postModel(data);
  const result = await newPost.save();
  return result;
};

export const fetchDb = async (skip, limit) => {
  const result = await postModel
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  return result;
};
