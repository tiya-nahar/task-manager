require('dotenv').config();
const pool = require('./db');

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()'); // DB ka current time la raha hai
    console.log('Database connected successfully at:', res.rows[0].now);
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
}

testConnection();
