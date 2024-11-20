const express = require("express");
const {
  registerUser,
  loginUser,
  activateUser,
} = require("../controller/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/activate", activateUser);

module.exports = router;
