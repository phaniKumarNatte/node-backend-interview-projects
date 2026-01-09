require('dotenv').config();
const db = require('mysql2/promise');

const config = {
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}


let connect = db.createPool(config);
connect.getConnection().then((conn) => {
    console.log('connected succssfully');
    conn.release();
}).catch((error) => {
    console.log('db eror',error);
});

module.exports = connect; 


