import { pool, getConnection } from '../../../../config/mysql/mysql_pool.js';
import generateUUID from '../../../../utils/uuid.js';
import bcrypt from 'bcrypt';
import cryptoSHA256 from 'crypto-js/sha256.js';
import valid from '../../../../utils/Validation/isValidation.js';

let salt = 12;

const Users = {
  signInData: async (data, cb) => {
    const sql2 = `SELECT * FROM accounts WHERE email = ? `;

    const [info, fields1] = await pool.execute(sql2, [data.email]);

    // console.log('패스워드', info[0].password);
    // console.log(data.password);
    // console.log(
    //   'compare',
    //   await bcrypt.compareSync(data.password, info[0].password),
    // );

    if (!data.password) {
      cb({ status: 'pwd', msg: '비밀번호를 입력하세요' });
    }

    if (await valid.isPasswordCompare(data.password, info[0].password)) {
      delete info[0].password;

      cb(info[0]);
    }
    try {
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
        console.log(msg);
        return;
      }

      const [isValid, fields] = await pool.execute(sql3, [data.email]);
      console.log(isValid);
      if (isValid.length >= 1) {
        msg = `${data.email}은/는 이미 사용중인 이메일 입니다.`;

        return cb(msg);
      }

      if (data.password !== data.confirmPassword) {
        msg = `패스워드가 일치하지 않습니다.`;

        return cb(msg);
      }

      const hashPass = await bcrypt.hash(data.password, salt);

      const params = [generateUUID(), data.nickname, data.email, hashPass];

      const [item, fileds] = await pool.execute(sql2, params);

      await cb(item);
    } catch (error) {
      console.log(error);
    }
  },
  logoutData: async (data, cb) => {
    const sql = ``;
  },
  profileData: async (data, cb) => {
    const sql = ``;
  },
};

export default Users;
