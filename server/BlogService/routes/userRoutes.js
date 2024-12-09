import express from "express";
import { authenticate } from "../middleware/tokenMiddleware.js";
import { dataController } from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.get("/data", authenticate, dataController);

export default userRoutes;
