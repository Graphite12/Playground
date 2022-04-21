import { pool, getConnection } from '../../../../config/mysql/mysql_pool.js';
import generateUUID from '../../../../utils/uuid.js';
import bcrypt from 'bcrypt';
import valid from '../../../../utils/Validation/isValidation.js';

let salt = 12;

export default {
  signInData: async (data, cb) => {
    try {
      const sql2 = `SELECT * FROM accounts WHERE email = ? `;

      if (data.email === '' && data.password === '') {
        cb({ status: 'unknown', msg: '이메일/패스워드를 입력해주세요' });
        return;
      }

      if (!data.email) {
        cb({ status: 'mail', msg: '이메일을 입력하세요' });
        return;
      }

      const [info, fields1] = await pool.execute(sql2, [data.email]);

      if (!data.password && !info[0]) {
        cb({ status: 'pwd', msg: '비밀번호를 입력하세요' });
        return;
      }

      if (!(await valid.isPasswordCompare(data.password, info[0].password))) {
        cb({ status: 'notPwd', msg: '비밀번호를 잘못입력하셨습니다.' });
      }

      delete info[0].password;
      cb(info[0]);
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
        cb({ status: 'email', msg });
      }

      const [isValid, fields1] = await pool.execute(sql3, [data.email]);

      console.log(isValid);

      if (isValid.length >= 1) {
        msg = `${data.email}은/는 이미 사용중인 이메일 입니다.`;

        cb({ status: 'existMail', msg });
      }

      if (data.password !== data.confirmPassword) {
        msg = `패스워드가 일치하지 않습니다.`;

        cb({ status: 'pwd', msg });
      }

      const hashPass = await bcrypt.hash(data.password, salt);

      const params = [generateUUID(), data.nickname, data.email, hashPass];

      const [item, fields2] = await pool.execute(sql2, params);

      await cb(item);
    } catch (error) {
      console.log(error);
    }
  },
  deleteData: async (data, cb) => {
    const sql = ``;
  },
  profileData: async (data, cb) => {
    const sql = `SELECT * FROM accounts WHERE uid = ? `;

    const [item, fields] = await pool.execute(sql, [data]);
  },
};
