import session from 'express-session';
import expressMYSQLStore from 'express-mysql-session';
import { pool } from '../mysql/mysql_pool.js';

const MySQLStore = expressMYSQLStore(session);
const sessionStore = new MySQLStore(
  {
    clearExpired: true,
    expiration: 10000,
    checkExpirationInterval: 10000,
    createDatabaseTable: true,
  },
  pool,
);

const sessionOption = {
  // 세션 암호화
  secret: 'abce!!',
  // 초괴화 되지 않은 채  스토어에 저장되는 세션
  saveUninitialized: false,
  //세션 항상 저장 여부
  resave: false,
  // 데이터 저장 형식
  store: sessionStore,
  cookie: {
    expires: 10000,
    secure: process.env.NODE_ENV === 'production' ? true : false,
  },
};

export default sessionOption;
