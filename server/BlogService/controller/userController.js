import {
  createUserService,
  dataService,
  changeUsernameService,
} from "../service/userService.js";

export async function dataController(req, res, next) {
  try {
    const data = await dataService(req.user.id);
    if (!data) {
      return res.status(200).json({ verified: false, id: req.user.id });
    }
    res.status(200).json({ verified: true, data: data });
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

export async function changeUsernameController(req, res, next) {
  try {
    const user = await changeUsernameService(req.user.id, req.body.username);
    console.log("User:", user);
    res.status(200).json({ success: "Username changed" });
  } catch (error) {
    next(error);
  }
}
