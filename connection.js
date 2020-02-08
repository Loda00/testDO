const mysql = require('mysql2/promise')
require('dotenv').config()

const { CONNECTION, HOST, USERBDD, PASSWORD, DATABASE } = process.env

const pool = mysql.createPool({
  connectionLimit: CONNECTION,
  host: HOST,
  user: USERBDD,
  password: PASSWORD,
  database: DATABASE
});

module.exports = {
  pool
}
