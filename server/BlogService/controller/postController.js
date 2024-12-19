import { base64Save } from "../service/base64Save.js";
import {
  fetchService,
  uploadService,
  postImageService,
} from "../service/postService.js";
import { searchUserByIdDb } from "../db/userDb.js";
import path from "path";

export async function uploadController(req, res, next) {
  try {
    const { content, image } = req.body;
    const filename = Date.now() + ".png";
    const user = await searchUserByIdDb(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Email not verified" });
    }
    base64Save(image, filename);
    await uploadService(user, content, filename);
    res.status(200).json({
      message: "File uploaded successfully!",
      content: content,
      image: filename,
    });
  } catch (error) {
    next(error);
  }
}

export async function fetchController(req, res, next) {
  try {
    const user = await searchUserByIdDb(req.user.id);
    const data = user
      ? await fetchService(user.following, user.interests)
      : await fetchService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function postImageController(req, res, next) {
  try {
    const imagePath = await postImageService(req.params.imageName);
    const absolutePath = path.resolve(imagePath);
    res.status(200).sendFile(absolutePath);
  } catch (error) {
    next(error);
  }
}
