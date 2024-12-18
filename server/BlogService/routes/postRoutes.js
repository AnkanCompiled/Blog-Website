import express from "express";
import { authenticate } from "../middleware/tokenMiddleware.js";
import {
  fetchController,
  uploadController,
  postImageController,
} from "../controller/postController.js";
import { uploadSingle } from "../middleware/multerMiddleware.js";

const postRoutes = express.Router();

postRoutes.get("/", authenticate, fetchController);

postRoutes.get("/image", postImageController);

postRoutes.post(
  "/upload",
  uploadSingle("image"),
  authenticate,
  uploadController
);

export default postRoutes;
