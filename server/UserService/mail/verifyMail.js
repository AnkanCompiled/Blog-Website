import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import AppError from "../error/AppError";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendVerifyMail(url, email) {
  const mailOptions = {
    from: `Verify BloggerNet <${process.env.MAIL_EMAIL}>`,
    to: email,
    subject: "Click on the verify link",
    html: `
    <div style="display: grid; font-family: Arial, sans-serif; text-align: center; padding: 20px; border-radius: 10px; background: linear-gradient(90deg, #444444, #555555);">
      <h2 style="color: #fff; padding-bottom: 10px; border-bottom: 2px solid #888888;">Verify your BloggerNet account!</h2>
      <p style="color: #eeeeee;">Please click the button below to verify your account:</p>
      <a href="${url}" style="background-color: #202938; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; box-shadow: 5px 5px 5px #222222;">Verify Account</a>
      <p style="color: #eeeeee; font-style: italic;">If you did not request this, please ignore this email.</p>
      <p style="color: #eeeeee;">&copy; 2024 BloggerNet. All rights reserved.</p>
    </div>
    `,
    text: `Please click on the following link to verify your BloggerNet account: ${url}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verify mail sent to", email);
  } catch (error) {
    throw new AppError(`Error in sending mail: ${error}`, 500);
  }
}
