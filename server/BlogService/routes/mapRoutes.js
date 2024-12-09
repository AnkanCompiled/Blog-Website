import express from "express";

import userRoutes from "./userRoutes.js";
const mapRoutes = express.Router();

mapRoutes.use("/user", userRoutes);

export default mapRoutes;
