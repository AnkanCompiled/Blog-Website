import express from "express";
import { authenticate } from "../middleware/tokenMiddleware.js";
import {
  createUserController,
  dataController,
} from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.get("/data", authenticate, dataController);
userRoutes.post("/create", createUserController);

export default userRoutes;
