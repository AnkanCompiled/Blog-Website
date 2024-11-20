const express = require("express");

const contentController = require("../controller/contentController");

const router = express.Router();

router.get("/posts", contentController.getPostIds);
router.post("/details", contentController.getDetails);
router.get("/image/:image", contentController.getImage);

module.exports = router;
