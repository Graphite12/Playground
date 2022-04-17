import { pool, getConnection } from '../../../../config/mysql/mysql_pool.js';
import generateUUID from '../../../../utils/uuid.js';
import bcrypt from 'bcrypt';
import valid from '../../../../utils/Validation/isValidation.js';
const Users = {
  signInData: async (data, cb) => {
    const sql = ``;
  },
  signUpData: async (data, cb) => {
    const sql1 = `INSERT INTO accounts (uid, username, email, password) VALUES (?, ?, ?, ?)`;
    const sql2 = `INSERT INTO accounts SET ?`;
    const sql3 = 'SELECT * FROM accounts WHERE email';

    let msg;

    try {
      if (!valid.isEmailValid(data.email)) {
        msg = `${data.email}의 형식이 일치하지 않습니다.`;
        console.log(msg);
      }

      const [isValid, fields] = await pool.execute(sql3, [data.email]);

      if (isValid.length > 1) {
        msg = `${data.email}은/는 이미 사용중인 이메일 입니다.`;
        console.log(msg);
      }

      if (data.password !== data.confirmPassword) {
        msg = `패스워드가 일치하지 않습니다.`;
        console.log(msg);
      }
      const hashPass = await bcrypt.hash(data.password, 12);

      const params = [generateUUID(), data.nickname, data.email, hashPass];
      console.log(params);
      const [item, fileds] = await pool.execute(sql1, params);
      console.log(item);
      console.log(fields);
      await cb(item);
    } catch (error) {}
  },
  logoutData: async (data, cb) => {
    const sql = ``;
  },
  profileData: async (data, cb) => {
    const sql = ``;
  },
};

export default Users;
