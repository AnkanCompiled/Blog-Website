import { uploadDb } from "../db/commentDb.js";
import AppError from "../error/AppError.js";
import { addCommentToPost, fetchCommentsDb, likeDb } from "../db/postDb.js";

export async function uploadService(userId, postId, comment) {
  try {
    const newComment = {
      user: userId,
      text: comment,
    };
    console.log("newComment", newComment);
    const commentData = await uploadDb(newComment);
    await addCommentToPost(postId, commentData._id);
    return commentData;
  } catch (error) {
    console.error("Error uploading comment:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function fetchService(userId, postId) {
  try {
    const storedComments = await fetchCommentsDb(postId);
    if (storedComments.length < 2) {
      storedComments[0].liked = userId
        ? storedComments[0]?.likes.some((likeId) => likeId.equals(userId))
        : false;
      return storedComments;
    }
    storedComments.sort((a, b) => {
      const aLiked = userId
        ? a.likes.some((likeId) => likeId.equals(userId))
        : false;
      const bLiked = userId
        ? b.likes.some((likeId) => likeId.equals(userId))
        : false;
      a.liked = aLiked;
      b.liked = bLiked;

      if (a.user === userId && b.user !== userId) return -1;
      if (a.user !== userId && b.user === userId) return 1;
      return b.likes.length - a.likes.length;
    });
    return storedComments;
  } catch (error) {
    console.error("Error fetching comment:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function likesService(userId, commentId, value) {
  try {
    await likeDb(userId, commentId, value);
  } catch (error) {
    console.error("Error liking comment:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}
