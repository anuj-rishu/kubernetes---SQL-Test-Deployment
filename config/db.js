require('dotenv').config()
const {Pool} = require('pg')

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
 
pool.connect()
.then(() => console.log('Connected to PostgreSQL'))
.catch((err) => console.log('Error connecting to PostgreSQL'));
 module.exports = pool