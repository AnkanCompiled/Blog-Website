import mySqlDb from "../config/mySqlConfig.js";
import {
  checkEmailExistsDb,
  getUserDb,
  registerUserDb,
  updateLastLogin,
} from "../db/loginDb.js";
import AppError from "../error/AppError.js";
import bcryptjs from "bcryptjs";
import { createToken } from "../middleware/tokenMiddleware.js";

export async function registerService(data) {
  const { email, password } = data;
  const todayDate = new Date();
  const hashedPassword = await bcryptjs.hash(password, 10);
  const conn = await mySqlDb.getConnection();
  try {
    await conn.beginTransaction();
    if (await checkEmailExistsDb(conn, email)) {
      throw new AppError("Email exists", 409);
    }
    const insertId = await registerUserDb(
      conn,
      email,
      hashedPassword,
      todayDate
    );
    await conn.commit();
    const token = createToken({
      id: insertId,
      role: "user",
      email_verified: 0,
      date: todayDate.toISOString(),
    });
    return token;
  } catch (error) {
    await conn.rollback();
    throw new AppError(error.message, error.statusCode || 500);
  } finally {
    conn.release();
  }
}

export async function loginService(data) {
  const { email, password } = data;
  const todayDate = new Date();
  const conn = await mySqlDb.getConnection();
  try {
    await conn.beginTransaction();
    const userData = await getUserDb(conn, email);
    if (!userData) {
      throw new AppError("Email not registered", 404);
    } else if (!(await bcryptjs.compare(password, userData.password))) {
      throw new AppError("Incorrect Password", 401);
    } else {
      await updateLastLogin(conn, email, todayDate);
      const token = createToken({
        id: userData?.id,
        role: userData?.role,
        email_verified: userData?.email_verified,
        date: todayDate.toISOString(),
      });
      return token;
    }
  } catch (error) {
    await conn.rollback();
    throw new AppError(error.message, error.statusCode || 500);
  } finally {
    conn.release();
  }
}
