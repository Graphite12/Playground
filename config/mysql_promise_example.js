import mysql from 'mysql2/promise';
import 'dotenv/config';
/**
 * A. createConnection
 */

const db = async () => {
  try {
    let conn = await mysql.createConnection({
      host: 'dbhost',
      user: 'dbuser',
      password: 'dbpwd',
      database: 'dbname',
    });

    /* SELECT */
    let [rows, fields] = await conn.query('SELECT * FROM table');

    /* INSERT */
    const iparams = [1, 2, 3, 4, 5];
    let [iresult] = await conn.query(
      'INSERT INTO table (a, b, c, d, e) VALUES (?, ?, ?, ?, ?)',
      iparams,
    );

    /* UPDATE */
    const uparams = [6, 7, 8, 9, 10];
    let [uresult] = await conn.query(
      'UPDATE table SET a = ?, b = ?, c = ?, d = ?, e = ? WHERE id = ?',
      uparams,
    );

    /* DELETE */

    let [dresult] = await conn.query('DELETE table FROM WHERE id = ?', [did]);
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * B. new Promise
 */

let dbs = await mysql.createConnection({
  host: 'dbhost',
  user: 'dbuser',
  password: 'dbpwd',
  database: 'dbname',
});

let test = new Promise((resolve, rejected) => {
  dbs.query('sql', (error, result) => {
    console.log('test');
  });
});
/**
 * createPool
 */
