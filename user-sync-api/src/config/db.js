require('dotenv').config();
const mysql = require('mysql2/promise');
const dbConfig = {
    host : process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

const db = mysql.createConnection(dbConfig).then((connection) => {
    console.log('connected successfully'); 
    return connection;
}).catch((err) => {
    console.log('db connection errro',err)
})
module.exports = db;
