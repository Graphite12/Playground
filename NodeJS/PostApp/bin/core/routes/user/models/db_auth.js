import { pool, getConnection } from '../../../../config/mysql/mysql_pool.js';
import generateUUID from '../../../../utils/uuid.js';
import bcrypt from 'bcrypt';
import valid from '../../../../utils/Validation/isValidation.js';

export default {
  signInData: async (data, cb) => {
    try {
      const existEmailSql = 'SELECT * FROM auth WHERE email = ?';

      if (data.email === '' || data.password === '') {
        return cb({ status: 'error', msg: '이메일/패스워드를 입력해주세요' });
      }

      const [item, fields1] = await pool.execute(existEmailSql, [data.email]);

      if (!(await valid.isPasswordCompare(data.password, info[0].password))) {
        return cb({ status: 'error', msg: '비밀번호를 잘못입력하셨습니다.' });
      }

      delete info[0].password;
      return cb({ status: 'success', data: info[0] });
    } catch (error) {
      console.log('[모델]로그인', error);
    }
  },
  signUpData: async (data, cb) => {
    const sql2 = `INSERT INTO auth (uid, email, username, password, provider_type, sign_ip) VALUES (?, ?, ?, ?, ?, ?)`;
    const sql3 = 'SELECT * FROM auth WHERE email = ?';
    const salt = 12;

    try {
      if (!valid.isEmailValid(data.email)) {
        return cb({
          status: 'error',
          msg: `${data.email}의 형식이 일치하지 않습니다.`,
        });
      }

      const [isValid] = await pool.execute(sql3);

      if (isValid.length >= 1) {
        return cb({
          status: 'error',
          msg: `${data.email}은/는 이미 사용중인 이메일 입니다.`,
        });
      }

      if (data.password !== data.confirmPassword) {
        return cb({ status: 'error', msg: `패스워드가 일치하지 않습니다.` });
      }

      const hashPass = await bcrypt.hash(data.password, salt);
      const params = [
        generateUUID(),
        data.email,
        data.nickname,
        hashPass,
        'Local',
      ];
    } catch (error) {
      console.log('[모델]회원가입', error);
    }
  },
  deleteData: async (data, cb) => {},
  profileData: async (data, cb) => {},
  updateUserData: async (data, cb) => {},
};
