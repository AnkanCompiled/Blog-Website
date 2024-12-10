import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/blog";

async function connectMongoDb() {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

export default connectMongoDb;
