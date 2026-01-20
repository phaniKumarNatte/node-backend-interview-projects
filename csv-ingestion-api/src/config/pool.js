require('dotenv').config();
const mysql = require('mysql2/promise');

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
};

const pool = mysql.createPool(config);

const createTableSql = `CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  gender VARCHAR(50),
  age INT
)`;

pool.query(createTableSql)
  .then(() => console.log('Db connected and ensured users table exists'))
  .catch((err) => console.error('Error ensuring users table', err));

module.exports = pool;
