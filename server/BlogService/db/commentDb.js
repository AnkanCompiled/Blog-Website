import commentModel from "../model/commentModel.js";

export const uploadDb = async (data) => {
  const newComment = new commentModel(data);
  const result = await newComment.save();
  return result;
};
