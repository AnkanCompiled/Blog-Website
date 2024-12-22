import { base64Save } from "../service/base64Save.js";
import {
  fetchService,
  uploadService,
  postImageService,
  likesService,
} from "../service/postService.js";
import path from "path";
import { dataService } from "../service/userService.js";

export async function uploadController(req, res, next) {
  try {
    const { content, image } = req.body;
    const filename = Date.now() + ".png";
    const user = await dataService(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Email not verified" });
    }
    base64Save(image, filename);
    await uploadService(user, content, filename);
    res.status(200).json({
      message: "File uploaded successfully!",
      image: filename,
    });
  } catch (error) {
    next(error);
  }
}

export async function fetchController(req, res, next) {
  try {
    const skip = parseInt(req.headers.skip, 10) || 0;

    const user = await dataService(req.user.id);
    const data = user
      ? await fetchService(user._id, user.following, user.interests, skip)
      : await fetchService({ skip: skip });

    const postObj = data?.toObject ? data.toObject() : data;

    res.status(200).json(postObj);
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

export async function likesController(req, res, next) {
  try {
    const user = await dataService(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Email not verified" });
    }
    await likesService(user._id, req.body.postId, req.body.value);
    res.status(200).json({ message: "Liked or Un-liked post successfully" });
  } catch (error) {
    next(error);
  }
}
