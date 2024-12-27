const pool = require ('../config/db')

const createUser = async (email, password) => {
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    const values = [email, password];
    const { rows } = await pool.query(query, values);
    return rows[0];
  };

  const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  };
  module.exports = { createUser, findUserByEmail };