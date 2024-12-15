import {
  createUserDb,
  searchUserByIdDb,
  changeUsernameDb,
} from "../db/userDb.js";
import AppError from "../error/AppError.js";

export async function dataService(id) {
  try {
    if (!id) {
      throw new AppError("User ID cannot be empty", 400);
    }
    const user = searchUserByIdDb(id);
    return user;
  } catch (error) {
    console.error("Error searching user:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

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

export async function changeUsernameService(id, username) {
  try {
    if (!id) {
      throw new AppError("User ID cannot be empty", 400);
    }
    const user = await changeUsernameDb(id, username);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  } catch (error) {
    console.error("Error updating username:", error);
    if (error.code === 11000) {
      throw new AppError("Username already exists", 409);
    } else {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }
}
