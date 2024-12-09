import express from "express";
import dotenv from "dotenv";
dotenv.config();
import errorHandler from "./error/errorHandler.js";
import mapRoutes from "./routes/mapRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
const Port = process.env.PORT || 3003;

app.use(express.json());

app.use("/blog", mapRoutes);

app.use(errorHandler);

app.listen(Port, () => {
  console.log(`User Service running on port ${Port}`);
});
