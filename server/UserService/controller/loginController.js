import { loginService, registerService } from "../service/loginService.js";

export async function registerController(req, res, next) {
  try {
    console.log("Register Body:", req.body);
    const token = await registerService(req.body);
    res.status(200).json({ token: token });
    //await verifyService(token, req.body.email);
  } catch (error) {
    next(error);
  }
}

export async function loginController(req, res, next) {
  try {
    console.log("Login Body:", req.body);
    const token = await loginService(req.body);
    res.status(200).json({ token: token });
  } catch (error) {
    next(error);
  }
}
