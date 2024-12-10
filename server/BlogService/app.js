import express from "express";
import dotenv from "dotenv";
dotenv.config();
import errorHandler from "./error/errorHandler.js";
import mapRoutes from "./routes/mapRoutes.js";
import cors from "cors";
import connectMongoDb from "./config/mongoDbConfig.js";

const app = express();
app.use(cors());
const Port = process.env.PORT || 3003;

app.use(express.json());

app.use("/bloggerNet", mapRoutes);

app.use(errorHandler);

connectMongoDb().then(() => {
  app.listen(Port, () => {
    console.log(`Blog Service running on port ${Port}`);
  });
});
