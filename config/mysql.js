import mysql from 'mysql2';
// import path from 'path';
// import dotenv from 'dotenv';
// const __dirname = path.resolve();
// dotenv.config({ path: path.join(__dirname, '.env/.env.development') });
import { mysql_config } from './dotenv_config.js';

const db_config = {
  init: () => {
    return mysql.createConnection(mysql_config);
  },
  connect: (conn) => {
    conn.connect((err) => {
      if (err) {
        console.log('마이에스큐엘 실행에러' + err);
      } else {
        console.log('마이에스큐엘 연결 성공!!!');
      }
    });
  },
  disconnect: (conn) => {
    conn.end((err) => {
      if (err) {
        console.log('마이에스큐엘 닫기에러' + err);
      } else {
        console.log('마이에스큐엘 닫기 성공!!!');
      }
    });
  },
};

export default db_config;
