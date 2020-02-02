require('dotenv').config();
import mysql from "mysql";

const connection = mysql.createConnection({
  host     : process.env.DB_HOST || 'localhost',
  user     : process.env.DB_USERNAME || 'admin',
  password : process.env.DB_PASSWORD || '',
  database : process.env.DB_NAME || 'ordering_api'
});

connection.connect();

console.log('connected');

export default connection;
