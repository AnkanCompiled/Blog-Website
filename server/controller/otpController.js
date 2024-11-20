const { createOTP, verifyOTP } = require("../service/otpService");
const { sendOTPMail } = require("../service/emailService");

const genrateOTP = async (req, res, next) => {
  try {
    const otp = createOTP(req.body.email);
    sendOTPMail(req.body.email, otp);
    res.status(201).json({ otp: otp });
  } catch (err) {
    next(err);
  }
};

const checkOTP = async (req, res, next) => {
  try {
    const success = await verifyOTP(req.body.email, req.body.input);
    console.log(success);
    res.status(201).json(success);
  } catch (err) {
    next(err);
  }
};

module.exports = { genrateOTP, checkOTP };
