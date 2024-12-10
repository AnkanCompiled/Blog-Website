import express from "express";
import { verifyController } from "../controller/emailController.js";

const emailRoutes = express.Router();

emailRoutes.post("/verify", verifyController);

export default emailRoutes;
