const express = require("express");
const { genrateOTP, checkOTP } = require("../controller/otpController");

const router = express.Router();

router.post("/genrate", genrateOTP);
router.post("/verify", checkOTP);

module.exports = router;
