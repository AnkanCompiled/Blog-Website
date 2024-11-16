const mysql = require("mysql2");
const { mySqlHost, mySqlUser, mySqlPassword, mySqlDatabase } = require("./env");

const pool = mysql.createPool({
  host: mySqlHost,
  user: mySqlUser,
  password: mySqlPassword,
  database: mySqlDatabase,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
