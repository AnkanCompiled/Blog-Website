const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.mySqlHost,
  user: process.env.mySqlUser,
  password: process.env.mySqlPassword,
  database: process.env.mySqlDatabase,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
