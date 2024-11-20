const nodemailer = require("nodemailer");
require("dotenv").config();

const senderMail = process.env.senderMail;
const passMail = process.env.passMail;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderMail,
    pass: passMail,
  },
});

const otpOptions = (reciverMail, otp) => {
  const otpHTML = `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
      <header style="background-color: #f77170; color: white; text-align: center; padding: 20px;">
        <h1 style="margin: 0; font-size: 24px;">Your OTP Code</h1>
      </header>
      <main style="padding: 20px; text-align: center; color: #333;">
        <p style="font-size: 16px;">Hello</p>
        <p style="font-size: 16px;">Your One-Time Password (OTP) is:</p>
        <div style="margin: 20px 0; font-size: 24px; font-weight: bold; color: #f77170; letter-spacing: 5px;">${otp}</div>
        <p style="font-size: 14px; color: #666;">This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
      </main>
      <footer style="background-color: #f4f4f4; text-align: center; padding: 10px; font-size: 12px; color: #666;">
        <p style="margin: 0;">If you did not request this OTP, please ignore this email.</p>
        <p style="margin: 5px 0;">&copy; BloggerNet AnkanCompiled Github 2024.</p>
      </footer>
    </div>
  </body>
  </html>
`;
  const format = {
    from: senderMail,
    to: reciverMail,
    subject: `Your OTP`,
    html: otpHTML,
  };
  return format;
};

function sendOTPMail(reciverMail, otp) {
  transporter.sendMail(otpOptions(reciverMail, otp), (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

const welcomeOptions = (reciverMail, fullname) => {
  const welcomeHTML = `
  <html>
  <head>
    <style>
      body {
        font-family: Trebuchet MS;
        color: #333;
      }
      .image {
        display: flex;
        justify-content: center;
      }
      .email-container {
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 10px;
        width: 600px;
        margin: 0 auto;
      }
      .email-header {
        text-align: center;
        font-size: 24px;
        color: #3399ff;
        margin-bottom: 20px;
      }
      .email-body {
        font-size: 16px;
        line-height: 1.6;
      }
      .email-footer {
        margin-top: 20px;
        font-size: 12px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="image"><img src="https://cashflowinventory.com/blog/wp-content/uploads/2023/02/inventory-management-system.webp" width="200px" alt="Logo" /></div>
      <div class="email-header"><strong>Welcome to Inventory Management App</strong></div>
      <div class="email-body">
        <p>Hello, <strong>${fullname}</strong>!</p>
        <p>Thank you for registering for our service. We're excited to have you onboard.</p>
      </div>
      <div class="email-footer">
        <p>&copy; 2024 Inventory Management Corporation.</p>
      </div>
    </div>
  </body>
</html>
`;
  const format = {
    from: senderMail,
    to: reciverMail,
    subject: `Welocome ${fullname} to Inventory Management App`,
    html: welcomeHTML,
  };
  return format;
};

function sendWelcomeMail(reciverMail, fullname) {
  transporter.sendMail(welcomeOptions(reciverMail, fullname), (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sendWelcomeMail, sendOTPMail };
