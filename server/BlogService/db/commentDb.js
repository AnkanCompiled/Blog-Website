import commentModel from "../model/commentModel.js";
import replyModel from "../model/replyModel.js";

export const uploadDb = async (data) => {
  const newComment = new commentModel(data);
  const result = await newComment.save();
  return result;
};

export const likeDb = async (userId, commentId, value) => {
  const update = value
    ? { $addToSet: { likes: userId } }
    : { $pull: { likes: userId } };
  await commentModel.findByIdAndUpdate(commentId, update);
};

export const fetchRepliesDb = async (id) => {
  const comment = await commentModel
    .findById(id, {
      replies: 1,
      _id: 0,
    })
    .populate({
      path: "replies",
      populate: [
        {
          path: "user",
          select: "username _id profilePicture",
        },
      ],
    })
    .lean();

  return comment ? comment.replies : [];
};

export const uploadReplyDb = async (data) => {
  const newReply = new replyModel(data);
  const result = await newReply.save();
  return result;
};

export const addReplyToComment = async (commentId, replyId) => {
  const comments = await commentModel.findById(commentId);
  comments.replies.push(replyId);
  await comments.save();
};
