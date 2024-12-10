import AppError from "../error/AppError.js";
import dotenv from "dotenv";
dotenv.config();
const GATEWAY_URL = process.env.GATEWAY_URL || "http://localhost:3000";

export async function urlService(token) {
  try {
    if (!token) {
      throw new AppError("Token not found", 404);
    }
    const url = `${GATEWAY_URL}/bloggerNet/user/verify/${token}`;
    return url;
  } catch (error) {
    throw new AppError(error.message, error.statusCode || 500);
  }
}
