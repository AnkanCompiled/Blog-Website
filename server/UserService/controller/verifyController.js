import { getEmail } from "../service/emailService.js";
import { verifyUserService } from "../service/verifyService.js";

export async function verifyUserController(req, res, next) {
  try {
    const email = await getEmail(req.user.userId);
    await verifyUserService(email, req.user.userId);
    res.status(200).json({ success: "Email Verified" });
  } catch (error) {
    next(error);
  }
}
