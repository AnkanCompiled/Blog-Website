import express from "express";

import userRoutes from "./userRoutes.js";
import postRoutes from "./postRoutes.js";
import commentRoutes from "./commentRoutes.js";
const mapRoutes = express.Router();

mapRoutes.use("/user", userRoutes);
mapRoutes.use("/post", postRoutes);
mapRoutes.use("/comment", commentRoutes);

export default mapRoutes;
