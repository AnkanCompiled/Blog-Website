import express from "express";
import {
  fetchController,
  uploadController,
  likesController,
} from "../controller/commentController.js";
const commentRoutes = express.Router();

commentRoutes.post("/", fetchController);
commentRoutes.post("/upload", uploadController);
commentRoutes.post("/likes", likesController);

export default commentRoutes;
