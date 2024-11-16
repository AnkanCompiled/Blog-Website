const db = require("../config/mySqlConnect");
const AppError = require("../error/AppError");
const mongoService = require("./userService");
const bcrypt = require("bcryptjs");

const registerUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.execute(
      "INSERT INTO Users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );
    await mongoService.registerUser(name, result.insertId);
    await conn.commit();
    return result.insertId;
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
    return rows[0].user_id;
  }
};

module.exports = { registerUser, loginUser };
