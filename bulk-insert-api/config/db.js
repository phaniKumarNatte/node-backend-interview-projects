require('dotenv').config();
const db = require('mysql2/promise');

let conn; 
let config = {
	host:process.env.HOST,
	user:process.env.USER,
	password:process.env.PASSWORD,
	database:process.env.DATABASE,
}

try{
	conn = db.createPool(config);
	console.log('db connected successfully');
}catch(error){
	console.log('db not connected',error);
}
 
module.exports = conn;
