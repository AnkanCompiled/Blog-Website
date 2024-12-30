import commentModel from "../model/commentModel.js";
import postModel from "../model/postModel.js";

export const uploadDb = async (data) => {
  const newPost = new postModel(data);
  const result = await newPost.save();
  return result;
};

export const fetchPostDb = async (skip, limit) => {
  const result = await postModel
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "author",
      select: "username _id profilePicture",
    })
    .lean();
  return result;
};

export const likeDb = async (userId, postId, value) => {
  const update = value
    ? { $addToSet: { likes: userId } }
    : { $pull: { likes: userId } };
  await commentModel.findByIdAndUpdate(postId, update);
};

export const addCommentToPost = async (postId, commentId) => {
  const post = await postModel.findById(postId);
  post.comments.push(commentId);
  await post.save();
};

export const fetchCommentsDb = async (id) => {
  const post = await postModel
    .findById(id, {
      comments: 1,
      _id: 0,
    })
    .populate({
      path: "comments",
      populate: [
        {
          path: "user",
          select: "username _id profilePicture",
        },
      ],
    })
    .lean();

  return post ? post.comments : [];
};
