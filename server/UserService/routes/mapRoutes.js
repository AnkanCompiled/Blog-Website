import express from "express";
import {
  registerController,
  loginController,
} from "../controller/loginController.js";
import emailRoutes from "./emailRoutes.js";
import { verifyUserController } from "../controller/verifyController.js";
import { authenticate } from "../middleware/tokenMiddleware.js";

const mapRoutes = express.Router();

mapRoutes.post("/register", registerController);
mapRoutes.post("/login", loginController);
mapRoutes.use("/email", emailRoutes);
mapRoutes.get("/verify", authenticate, verifyUserController);

export default mapRoutes;
