import { searchUserByIdDb } from "../db/userDb.js";
import { dataService } from "../service/userService.js";
import { uploadService, fetchService } from "../service/commentService.js";

export async function uploadController(req, res, next) {
  try {
    const user = await dataService(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Email not verified" });
    }
    const commentData = await uploadService(
      _id,
      req.body.postId,
      req.body.comment
    );
    const commentObj = commentData.toObject
      ? commentData.toObject()
      : commentData;
    res.status(200).json({
      ...commentObj,
      user: {
        _id: user._id,
        username: user.username,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function fetchController(req, res, next) {
  try {
    const user = await dataService(req.user.id);
    const data = await fetchService(user ? user._id : "", req.body.postId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
