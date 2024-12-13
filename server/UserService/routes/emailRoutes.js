import express from "express";
import { verifyController } from "../controller/emailController.js";
import { authenticate } from "../middleware/tokenMiddleware.js";

const emailRoutes = express.Router();

emailRoutes.get("/verify", authenticate, verifyController);

export default emailRoutes;
