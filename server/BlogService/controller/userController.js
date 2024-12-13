import { createUserService } from "../service/userService.js";

export async function dataController(req, res, next) {
  try {
    if (!req.user.email_verified) {
      const data = { id: req.user.id, email_verified: req.user.email_verified };
      return res.status(200).json({ verified: false, data: data });
    }

    res.status(200).json({ verified: true, data: req.user });
  } catch (error) {
    next(error);
  }
}

export async function createUserController(req, res, next) {
  try {
    const user = await createUserService(req.body.id);
    console.log("User:", user);
    res.status(200).json({ success: "User created" });
  } catch (error) {
    next(error);
  }
}
