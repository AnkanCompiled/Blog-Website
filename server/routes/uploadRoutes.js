const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const path = require("path");

const { uploadController } = require("../controller/uploadController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authenticate,
  express.static(path.join(__dirname, "..", "assets", "uploadImages")),
  upload.single("image"),
  uploadController
);

module.exports = router;
