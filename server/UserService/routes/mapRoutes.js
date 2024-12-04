import express from "express";
import {
  registerController,
  loginController,
} from "../controller/loginController.js";

const mapRoutes = express.Router();

mapRoutes.post("/register", registerController);
mapRoutes.post("/login", loginController);

export default mapRoutes;
