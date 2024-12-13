export const verifyUserDb = async (conn, email) => {
  const [result] = await conn.execute(
    "UPDATE user_service SET email_verified = ? WHERE email = ?",
    [true, email]
  );
  return result.changedRows;
};
