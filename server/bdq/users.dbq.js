// dbQueries.js
import { pool } from "../db.js";
import generateRandomUuid from "../utilities/randomUUID.js";
// const user_role = process.env.USER_ROLE;
import { v4 as uuidv4 } from 'uuid';

const getUserByEmailQuery = async (email) => {
  return await pool.query('SELECT * FROM users.users WHERE email = $1', [email]);
};

const updateSessionQuery = async (email) => {
  return await pool.query('UPDATE users.users SET session_uuid=$1 WHERE email = $2', [generateRandomUuid(), email]);
};

const insertUserQuery = async (first_name, last_name, email, phone, pass) => {
  return await pool.query(
    'INSERT INTO users.users (session_uuid, user_uuid, user_role, first_name, last_name, email, phone, pass, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [generateRandomUuid(), uuidv4(), process.env.USER_ROLE, first_name, last_name, email, phone, pass, new Date]
  );
};

const getUserPass = async (email) => {
  return await pool.query('SELECT pass FROM users.users WHERE email = $1', [email]);
};

const getUserByCredentialsQuery = async (email, pass) => {
  return await pool.query('SELECT * FROM users.users WHERE email = $1 AND pass = $2', [email, pass]);
};

export {
  getUserByEmailQuery,
  updateSessionQuery,
  insertUserQuery,
  getUserByCredentialsQuery,
  getUserPass
}