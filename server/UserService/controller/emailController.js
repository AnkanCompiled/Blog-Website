import { urlService } from "../service/urlService.js";

export async function verifyController(req, res, next) {
  try {
    console.log("Token:", req.body?.token);
    const url = await urlService(req.body.token);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
}
