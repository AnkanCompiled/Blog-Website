import multer from "multer";
import path from "path";
import fs from "fs";
import AppError from "../error/AppError.js";

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

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
    fieldSize: 2 * 1024 * 1024,
  },
});

export const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          return next(new AppError(`Multer error: ${err.message}`, 400));
        }
        return next(new AppError(err.message, 500));
      }
      next();
    });
  };
};
