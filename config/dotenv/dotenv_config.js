import path from 'path';
import dotenv from 'dotenv';
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, '.env/.env.development') });

/* Mysql Config */
const mysql_config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
};

/* Mysql Promise Config */
const pool_config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // 최대 연결 횟수
};

export { mysql_config, pool_config };
