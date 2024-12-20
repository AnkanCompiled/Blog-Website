import express from "express";
import { authenticate } from "../middleware/tokenMiddleware.js";
import {
  fetchController,
  uploadController,
  postImageController,
  likesController,
} from "../controller/postController.js";
import { uploadSingle } from "../middleware/multerMiddleware.js";

const postRoutes = express.Router();

postRoutes.get("/", authenticate, fetchController);

postRoutes.get("/image/:imageName", postImageController);

postRoutes.post("/likes", authenticate, likesController);

postRoutes.post(
  "/upload",
  uploadSingle("image"),
  authenticate,
  uploadController
);

export default postRoutes;
