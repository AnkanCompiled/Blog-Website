import { uploadDb } from "../db/commentDb.js";
import AppError from "../error/AppError.js";
import { addCommentToPost, fetchCommentsDb } from "../db/postDb.js";

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
    storedComments.sort((a, b) => {
      if (a.user === userId && b.user !== userId) return -1;
      if (a.user !== userId && b.user === userId) return 1;
      return b.likes - a.likes;
    });
    console.log("storedComments", storedComments);
    return storedComments.reverse();
  } catch (error) {
    console.error("Error fetching comment:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}
