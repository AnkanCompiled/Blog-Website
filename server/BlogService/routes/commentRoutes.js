import express from "express";
import {
  fetchController,
  uploadController,
  likesController,
  fetchRepliesController,
  uploadReplyController,
} from "../controller/commentController.js";
const commentRoutes = express.Router();

commentRoutes.post("/", fetchController);
commentRoutes.post("/upload", uploadController);
commentRoutes.post("/likes", likesController);
commentRoutes.post("/uploadReply", uploadReplyController);
commentRoutes.post("/replies", fetchRepliesController);

export default commentRoutes;
