import { uploadDb } from "../db/postDb.js";
import { addPostToUser } from "../db/userDb.js";
import { searchUserByIdDb } from "../db/userDb.js";
import AppError from "../error/AppError.js";

export async function uploadService(id, content, fileName) {
  try {
    if (!id) {
      throw new AppError("User ID cannot be empty", 400);
    }
    const user = await searchUserByIdDb(id);
    const newPost = {
      author: user._id,
      content: content,
      mediaUrl: fileName,
    };
    const postId = await uploadDb(newPost);
    await addPostToUser(id, postId);
  } catch (error) {
    console.error("Error searching user:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}
