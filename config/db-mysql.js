const mysql = require("mysql");

const db = mysql.createConnection({
  multipleStatements: true,
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_USER_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

module.exports = db;
