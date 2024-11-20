const db = require("../config/mySqlConnect");
const AppError = require("../error/AppError");
const mongoService = require("./userService");
const bcrypt = require("bcryptjs");
const { sendWelcomeMail, sendOTPMail } = require("../service/emailService");
const otps = new Map();

const registerUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const [mySql] = await conn.execute(
      "INSERT INTO Users (email, password, name, active) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, name, false]
    );
    await mongoService.registerUser(name, mySql.insertId);
    await conn.commit();
    const [result] = await db.execute("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    return result[0];
  } catch (error) {
    await conn.rollback();
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      throw new AppError(error.message, 409);
    }
    throw error;
  } finally {
    conn.release();
  }
};

const loginUser = async (email, password) => {
  const [rows] = await db.execute("SELECT * FROM Users WHERE email = ?", [
    email,
  ]);
  if (!rows[0]) {
    throw new AppError("Email doesnot exist", 404);
  } else if (!(await bcrypt.compare(password, rows[0].password))) {
    throw new AppError("Password doesnot match", 401);
  } else {
    return rows[0];
  }
};

const activateEmail = async (email, status) => {
  try {
    await db.execute("UPDATE Users SET active = ? WHERE email = ?", [
      status,
      email,
    ]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, loginUser, activateEmail };
