import AppError from "../error/AppError.js";
import dotenv from "dotenv";
dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export async function urlService(token) {
  try {
    if (!token) {
      throw new AppError("Token not found", 404);
    }
    const url = `${FRONTEND_URL}/verify/${token}`;
    return url;
  } catch (error) {
    throw new AppError(error.message, error.statusCode || 500);
  }
}
