const pool = require('./config/db');

(async () => {
  const createTableQuery = `
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Table "users" created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    pool.end();
  }
})();
