import express from "express";
import {
  registerController,
  loginController,
} from "../controller/loginController.js";
import emailRoutes from "./emailRoutes.js";

const mapRoutes = express.Router();

mapRoutes.post("/register", registerController);
mapRoutes.post("/login", loginController);
mapRoutes.use("/email", emailRoutes);

export default mapRoutes;
