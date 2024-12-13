import { createUserDb } from "../db/userDb.js";
import AppError from "../error/AppError.js";

export async function createUserService(id) {
  try {
    if (!id) {
      throw new AppError("User ID cannot be empty", 400);
    }
    const newUser = {
      userId: id,
      username: `Guest_${id}`,
    };
    const user = await createUserDb(newUser);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}
