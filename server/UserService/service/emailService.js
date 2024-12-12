import { urlService } from "./urlService";
import AppError from "../error/AppError";

export async function verifyService(token, email) {
  try {
    const url = await urlService(token);
  } catch (error) {
    throw new AppError(error.message, error.statusCode || 500);
  }
}
