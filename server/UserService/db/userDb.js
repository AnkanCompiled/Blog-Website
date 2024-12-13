export const getEmailDb = async (conn, id) => {
  const [result] = await conn.execute(
    "SELECT email FROM user_service WHERE id = ?",
    [id]
  );
  console.log(result);
  return result[0].email;
};
