// PostgreSQL ka module import
const { Pool } = require('pg');

// .env file se DATABASE_URL le rahe hain
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Connection check karne ka function
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Database connection error:', err.stack);
  }
  console.log('Database connected successfully!');

  // Ek simple query run karte hain
  client.query('SELECT NOW()', (err, result) => {
    release(); // client ko release karna zaroori hai
    if (err) {
      return console.error('Error running query:', err.stack);
    }
    console.log('Server time:', result.rows[0]);
  });
});

// Export kar rahe hain taki use ho sake dusri files me
module.exports = pool;
