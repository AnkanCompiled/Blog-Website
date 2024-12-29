import commentModel from "../model/commentModel.js";

export const uploadDb = async (data) => {
  const newComment = new commentModel(data);
  const result = await newComment.save();
  return result;
};

export const likeDb = async (userId, commentId, value) => {
  const update = value
    ? { $addToSet: { likes: userId } }
    : { $pull: { likes: userId } };
  await postModel.findByIdAndUpdate(commentId, update);
};
