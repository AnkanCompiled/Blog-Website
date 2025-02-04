import {
  uploadService,
  fetchService,
  likesService,
  fetchRepliesService,
  uploadReplyService,
} from "../service/commentService.js";

export async function uploadController(req, res, next) {
  try {
    const user = req.body.user;
    if (!user) {
      return res.status(401).json({ message: "Email not verified" });
    }
    const commentData = await uploadService(
      user._id,
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
    const data = await fetchService(
      req.body.id ? req.body.id : "",
      req.body.postId
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function likesController(req, res, next) {
  try {
    if (!req.body.id) {
      return res.status(401).json({ message: "Email not verified" });
    }
    await likesService(
      req.body.id,
      req.body.commentId,
      req.body.value,
      req.body.isReply
    );
    res.status(200).json({ message: "Liked or Un-liked comment successfully" });
  } catch (error) {
    next(error);
  }
}

export async function uploadReplyController(req, res, next) {
  try {
    const user = req.body.user;
    if (!user) {
      return res.status(401).json({ message: "Email not verified" });
    }
    const replyData = await uploadReplyService(
      user._id,
      req.body.commentId,
      req.body.reply
    );
    const replyObj = replyData.toObject ? replyData.toObject() : replyData;
    res.status(200).json({
      ...replyObj,
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

export async function fetchRepliesController(req, res, next) {
  try {
    const data = await fetchRepliesService(
      req.body.id ? req.body.id : "",
      req.body.commentId
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
