import { verifyService } from "../service/userService.js";

export async function dataController(req, res, next) {
  try {
    if (!req.user.email_verified) {
      const data = { id: req.user.id, email_verified: req.user.email_verified };
      return res.status(200).json({ verified: false, data: data });
    }

    res.status(200).json({ message: "Access granted" });
  } catch (error) {
    next(error);
  }
}

export async function verifyController(req, res, next) {
  try {
    console.log("Token:", req.body?.token);
    await verifyService(req.body.token);
    res.status(200).json({ success: "Email verified" });
  } catch (error) {
    next(error);
  }
}
