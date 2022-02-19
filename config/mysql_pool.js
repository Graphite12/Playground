import mysql from 'mysql2/promise';
import 'dotenv/config';

const db_pool = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 4,
};

const pool = mysql.createPool(db_pool);

const testrun = async () => {
  const connenction1 = await pool.getConnection(async (conn) => conn);
  const connenction2 = await pool.getConnection(async (conn) => conn);
  const connenction3 = await pool.getConnection(async (conn) => conn);
  const connenction4 = await pool.getConnection(async (conn) => conn);
  try {
    let insertSql = 'INSERT INTO testuser (age, gender, name) VALUES(?,?,?)';
    let selectSql = 'SELECT * FROM testuser';

    let [rows, fields] = await connenction1.query(insertSql, [
      20,
      'male',
      'kim',
    ]);
    let [rows1, fields1] = await connenction2.query(insertSql, [
      20,
      'female',
      'park',
    ]);
    let [rows2, fields2] = await connenction3.query(insertSql, [
      20,
      'male',
      'joe',
    ]);
    let [rows3, fields3] = await connenction4.query(insertSql, [
      20,
      'male',
      'jang',
    ]);

    console.log(rows);
    console.log(rows1);
    console.log(rows2);
    console.log(rows3);
    console.log(fields);
  } catch (error) {
    console.error(error);
  }
};

export default testrun;
// export default pool;
