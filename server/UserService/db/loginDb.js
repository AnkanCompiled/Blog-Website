export const checkEmailExistsDb = async (conn, email) => {
  const [result] = await conn.execute(
    "SELECT COUNT(*) AS count FROM user_service WHERE email = ?",
    [email]
  );
  return result[0].count > 0;
};

export const registerUserDb = async (
  conn,
  email,
  hashedPassword,
  todayDate
) => {
  const [result] = await conn.execute(
    "INSERT INTO user_service (email, password, last_login) VALUES (?, ?, ?)",
    [email, hashedPassword, todayDate]
  );
  return result.insertId;
};

export const getUserDb = async (conn, email) => {
  const [result] = await conn.execute(
    "SELECT * FROM user_service WHERE email = ?",
    [email]
  );
  return result[0];
};

export const updateLastLogin = async (conn, email, date) => {
  const [result] = await conn.execute(
    "UPDATE user_service SET last_login = ? WHERE email = ?",
    [date, email]
  );
  return result.changedRows;
};
