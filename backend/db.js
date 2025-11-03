import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const db = await mysql.createPool({
  host: process.env.DB_HOST || '54.166.37.210',
  user: process.env.DB_USER || 'ionic_user',
  password: process.env.DB_PASS || 'ionic_pass',
  database: process.env.DB_NAME || 'ionic',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

