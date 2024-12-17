import express from "express";
import multer from "multer";
import { authenticate } from "../middleware/tokenMiddleware.js";
import { uploadController } from "../controller/postController.js";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const postRoutes = express.Router();

postRoutes.post(
  "/upload",
  upload.single("image"),
  authenticate,
  uploadController
);

export default postRoutes;
