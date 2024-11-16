const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.get("/", userController.registerUser);
router.post("/", userController.loginUser);

module.exports = router;
