import express from "express";
import { authenticate } from "../middleware/tokenMiddleware.js";
import {
  fetchController,
  uploadController,
} from "../controller/commentController.js";
const commentRoutes = express.Router();

commentRoutes.post("/", authenticate, fetchController);
commentRoutes.post("/upload", authenticate, uploadController);

export default commentRoutes;
