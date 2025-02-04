import mySqlDb from "../config/mySqlConfig.js";
import { urlService } from "./urlService.js";
import AppError from "../error/AppError.js";
import { sendVerifyMail } from "../mail/verifyMail.js";
import { getEmailDb } from "../db/userDb.js";

export async function verifyService(token, email) {
  try {
    const url = await urlService(token);
    await sendVerifyMail(url, email);
  } catch (error) {
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function getEmail(id) {
  try {
    console.log(id);
    const email = await getEmailDb(mySqlDb, id);
    return email;
  } catch (error) {
    throw new AppError(error.message, error.statusCode || 500);
  }
}
