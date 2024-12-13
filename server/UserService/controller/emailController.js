import { getEmail, verifyService } from "../service/emailService.js";

export async function verifyController(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("Token:", token);
    const email = await getEmail(req.user.id);
    await verifyService(token, email);
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
}
