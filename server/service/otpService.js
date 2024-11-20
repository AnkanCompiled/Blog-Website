const { activateEmail } = require("./mySqlService");

const otps = new Map();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

function createOTP(email) {
  const otp = generateOTP();
  otps.set(email, otp);
  console.log(`OTP for ${email}: ${otp}`);

  setTimeout(() => {
    otps.delete(email);
    console.log(`OTP for ${email} has been erased.`);
  }, 10 * 60 * 1000);

  return otp;
}

async function verifyOTP(email, inputOtp) {
  try {
    const storedOtp = otps.get(email);
    console.log(storedOtp);
    if (storedOtp === undefined) {
      return { success: false, message: "OTP expired or not found." };
    }
    if (storedOtp == inputOtp) {
      await activateEmail(email, true);
      otps.delete(email);
      return { success: true, message: "OTP verified successfully." };
    }
    return { success: false, message: "OTP not matched." };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

module.exports = { createOTP, verifyOTP };
