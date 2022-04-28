import path from 'path';
import dotenv from 'dotenv';
const __dirname = path.resolve();
dotenv.config({ path: path.join(`${__dirname}/bin`, '.env/.env.development') });

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

let defualt_url = 'http://localhost:8080';
/* OAuth2.0  */
const google_config = {
  callback: `${defualt_url}/auth/google/callback`,
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientPWD: process.env.GOOGLE_CLIENT_SECRET,
};

const kakao_config = {
  callback: '/users/google/callback',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientPWD: process.env.GOOGLE_CLIENT_SECRET,
};

const github_config = {
  callback: '/users/google/callback',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientPWD: process.env.GOOGLE_CLIENT_SECRET,
};

const facebook_config = {
  callback: '/users/google/callback',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientPWD: process.env.GOOGLE_CLIENT_SECRET,
};

export { mysql_config, pool_config, google_config, kakao_config };
