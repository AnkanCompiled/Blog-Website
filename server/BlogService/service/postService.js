import { fetchDb, uploadDb, likeDb } from "../db/postDb.js";
import { addPostToUser, searchUserByMongoIdDb } from "../db/userDb.js";
import AppError from "../error/AppError.js";
import redisClient from "../config/redisConfig.js";
import path from "path";
import fs from "fs/promises";

export async function uploadService(userData, content, fileName) {
  try {
    const newPost = {
      author: userData._id,
      content: content,
      mediaUrl: fileName,
    };
    const post = await uploadDb(newPost);
    await addPostToUser(userData.userId, post._id);
    await redisClient.set(
      `postCache:${post._id}`,
      JSON.stringify({ post: post, username: userData.username }),
      {
        EX: 7200,
      }
    );
  } catch (error) {
    console.error("Error uploading:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function fetchService(
  id,
  following = "",
  interests = "",
  skip = 0,
  limit = 5
) {
  const selectedPosts = [];
  const selectedPostIds = new Set();

  try {
    const recentPosts = await fetchDb(skip, limit);

    const addPost = async (post) => {
      if (!selectedPostIds.has(post._id.toString())) {
        const { username, profilePicture } = await searchUserByMongoIdDb(
          post.author
        );
        selectedPosts.push({
          post: post,
          username: username,
          profilePicture: profilePicture,
          liked: post.likes.includes(id),
        });
        selectedPostIds.add(post._id.toString());
      }
    };

    // Process posts based on `following`
    if (following) {
      for (const post of recentPosts) {
        if (following.includes(post.author._id)) {
          await addPost(post);
        }
      }
    }

    // Process posts based on `interests`
    if (interests) {
      for (const post of recentPosts) {
        if (post.tags.some((tag) => interests.includes(tag))) {
          await addPost(post);
        }
      }
    }

    // Process remaining posts
    for (const post of recentPosts) {
      await addPost(post);
    }

    return selectedPosts;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function postImageService(imageName) {
  try {
    const imagePath = path.join(process.cwd(), "uploads", imageName);
    await fs.access(imagePath);
    return imagePath;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw new AppError(error.message, error.statusCode || 404);
  }
}

export async function likesService(userId, postId, value) {
  try {
    await likeDb(userId, postId, value);
  } catch (error) {
    console.error("Error liking post:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}
