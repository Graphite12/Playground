import { pool, getConnection } from '../../../../config/mysql/mysql_pool.js';
import generateUUID from '../../../../utils/uuid.js';
import bcrypt from 'bcrypt';
import valid from '../../../../utils/Validation/isValidation.js';

let salt = 12;

const Users = {
  signInData: async (data, cb) => {
    try {
      const sql2 = `SELECT * FROM accounts WHERE email = ? `;

      if (data.email === '' || data.password === '') {
        return cb({ status: 'unknown', msg: '이메일/패스워드를 입력해주세요' });
      }

      const [info, fields1] = await pool.execute(sql2, [data.email]);

      if (!(await valid.isPasswordCompare(data.password, info[0].password))) {
        return cb({ status: 'notPwd', msg: '비밀번호를 잘못입력하셨습니다.' });
      }

      delete info[0].password;
      return cb({ status: 'success', data: info[0] });
    } catch (error) {
      console.log(error);
    }
  },

  signUpData: async (data, cb) => {
    const sql1 = `INSERT INTO accounts (uid, username, email, password) VALUES (uuid_to_bin(?), ?, ?, ?)`;
    const sql2 = `INSERT INTO accounts (uid, username, email, password) VALUES (?, ?, ?, ?)`;
    const sql3 = 'SELECT * FROM accounts WHERE email = ?';

    let msg;

    try {
      if (!valid.isEmailValid(data.email)) {
        msg = `${data.email}의 형식이 일치하지 않습니다.`;
        return cb({ status: 'email', msg });
      }

      const [isValid, fields1] = await pool.execute(sql3, [data.email]);

      console.log(isValid);

      if (isValid.length >= 1) {
        msg = `${data.email}은/는 이미 사용중인 이메일 입니다.`;

        return cb({ status: 'existMail', msg });
      }

      if (data.password !== data.confirmPassword) {
        msg = `패스워드가 일치하지 않습니다.`;
        return cb({ status: 'pwd', msg });
      }

      const hashPass = await bcrypt.hash(data.password, salt);

      const params = [generateUUID(), data.nickname, data.email, hashPass];

      const [item] = await pool.execute(sql2, params);

      console.log(item);
      return cb({ status: 'success' });
    } catch (error) {
      console.log(error);
    }
  },
  deleteData: async (data, cb) => {
    const sql = ``;
  },
  profileData: async (data, cb) => {
    const sql = `SELECT * FROM accounts WHERE uid = ? `;

    const [item] = await pool.execute(sql, [data]);

    delete item[0].password;

    return cb(item[0]);
  },
  getAllUser: async (cb) => {
    const sql = `SELECT * FROM accounts`;

    const [list] = await pool.execute(sql);

    cb(list);
  },

  updateUserData: async (data, cb) => {
    const sql2 = `UPDATE accounts SET username = ?, email = ?, password = ? WHERE uid = ?`;

    if (!valid.isEmailValid(data.email)) {
      return cb({
        status: 'error',
        msg: `${data.email}의 형식이 일치하지 않습니다.`,
      });
    }

    if (data.password !== data.confirmPassword) {
      return cb({ status: 'error', msg: `패스워드가 일치하지 않습니다.` });
    }

    console.log(data.uid);
    const newHash = await bcrypt.hash(data.password, salt);

    const [item] = await pool.execute(sql2, [
      data.username,
      data.email,
      newHash,
      data.uid,
    ]);

    return cb({ status: 'success', data: item });
  },
};

export default Users;
