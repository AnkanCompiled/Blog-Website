import postModel from "../model/postModel.js";
import mongoose from "mongoose";

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

export const likeDb = async (userId, postId, value) => {
  const update = value
    ? { $addToSet: { likes: userId } }
    : { $pull: { likes: userId } };
  await postModel.findByIdAndUpdate(postId, update);
};
