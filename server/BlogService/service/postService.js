import { fetchDb, uploadDb } from "../db/postDb.js";
import { addPostToUser } from "../db/userDb.js";
import AppError from "../error/AppError.js";
import redisClient from "../config/redisConfig.js";
import path from "path";
import fs from "fs";

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
  following = "",
  interests = "",
  skip = 0,
  limit = 10
) {
  const selectedPosts = [];
  const selectedPostIds = new Set();
  try {
    const recentPosts = await fetchDb(skip, limit);

    const addPost = (post) => {
      if (!selectedPostIds.has(post._id.toString())) {
        selectedPosts.push(post);
        selectedPostIds.add(post._id.toString());
      }
    };

    if (following) {
      recentPosts.forEach((post) => {
        if (following.includes(post.author._id)) {
          addPost(post);
        }
      });
    }

    if (interests) {
      recentPosts.forEach((post) => {
        if (post.tags.some((tag) => interests.includes(tag))) {
          addPost(post);
        }
      });
    }
    recentPosts.forEach((post) => {
      addPost(post);
    });

    return selectedPosts;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function postImageService(imageName) {
  try {
    const imagePath = path.join(__dirname, "../uploads/", imageName);
    fs.access(imagePath);
    return imagePath;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}
