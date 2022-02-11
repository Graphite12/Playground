import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const db_info = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
};

const db_config = {
  init: () => {
    return mysql.createConnection(db_info);
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
