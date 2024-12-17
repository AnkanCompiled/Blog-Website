import express from "express";

import userRoutes from "./userRoutes.js";
import postRoutes from "./postRoutes.js";
const mapRoutes = express.Router();

mapRoutes.use("/user", userRoutes);
mapRoutes.use("/post", postRoutes);

export default mapRoutes;
