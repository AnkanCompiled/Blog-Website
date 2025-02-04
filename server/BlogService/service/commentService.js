import {
  uploadDb,
  likeDb,
  fetchRepliesDb,
  uploadReplyDb,
  addReplyToComment,
} from "../db/commentDb.js";
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

function commentSortService(userId, storedComments) {
  if (storedComments)
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

    const isAUser = a.user._id.toString() === userId;
    const isBUser = b.user._id.toString() === userId;

    if (isAUser && isBUser) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (isAUser) return -1;
    if (isBUser) return 1;

    const likesDiff = b.likes.length - a.likes.length;
    if (likesDiff !== 0) return likesDiff;

    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return storedComments;
}

export async function fetchService(userId, postId) {
  try {
    const storedComments = await fetchCommentsDb(postId);
    if (!storedComments) return [];
    const sortedStoredComments = await commentSortService(
      userId,
      storedComments
    );
    return sortedStoredComments;
  } catch (error) {
    console.error("Error fetching comment:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function likesService(userId, commentId, value, isReply) {
  try {
    await likeDb(userId, commentId, value, isReply);
  } catch (error) {
    console.error("Error liking comment:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function uploadReplyService(userId, commentId, reply) {
  try {
    const newReply = {
      user: userId,
      text: reply,
    };
    console.log("newComment", newReply);
    const replyData = await uploadReplyDb(newReply);
    await addReplyToComment(commentId, replyData._id);
    return replyData;
  } catch (error) {
    console.error("Error uploading reply:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function fetchRepliesService(userId, commentId) {
  try {
    const storedComments = await fetchRepliesDb(commentId);
    console.log(storedComments);

    const sortedStoredComments = await commentSortService(
      userId,
      storedComments
    );
    return sortedStoredComments;
  } catch (error) {
    console.error("Error fetching replies:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}
