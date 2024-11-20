const express = require("express");
const userRoutes = require("./userRoutes");
const otpRoutes = require("./otpRoutes");
const uploadRoute = require("./uploadRoutes");
const contentRoute = require("./contentRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/otp", otpRoutes);
router.use("/upload", uploadRoute);
router.use("/content", contentRoute);

module.exports = router;
