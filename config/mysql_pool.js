import mysql from 'mysql2/promise';
import { pool_config } from './dotenv_config.js';

/* createPool 모듈화 */
const pool = mysql.createPool(pool_config);

/* getConnection 모듈화  */
const getConnection = async (cb) => {
  await pool.getConnection((err, conn) => {
    if (err) {
      throw new Error();
    }
    cb(conn);
  });
};
export { pool, getConnection };
