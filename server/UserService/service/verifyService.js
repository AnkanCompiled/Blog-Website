import mySqlDb from "../config/mySqlConfig.js";
import { updateLastLogin } from "../db/loginDb.js";
import { verifyUserDb } from "../db/verifyDb.js";
import AppError from "../error/AppError.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const createMongoUrl = `${process.env.GATEWAY_URL}/bloggerNet/user/create`;

export async function verifyUserService(email, id) {
  const conn = await mySqlDb.getConnection();
  const todayDate = new Date();
  try {
    await conn.beginTransaction();
    const result = await verifyUserDb(conn, email);
    if (result == 0) {
      throw new AppError("User already verified", 409);
    }
    const createApi = await axios.post(createMongoUrl, { id: id });
    if (createApi.status != 200) {
      throw new AppError("Error creating verified user", 400);
    }
    await updateLastLogin(conn, email, todayDate);
    await conn.commit();
    return token;
  } catch (error) {
    await conn.rollback();
    throw new AppError(error.message, error.statusCode || 500);
  } finally {
    conn.release();
  }
}
