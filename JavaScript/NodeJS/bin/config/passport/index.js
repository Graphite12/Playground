import passport from 'passport';
import Users from '../../core/routes/user/models/db_users.js';
import local from './local-mysql.js';

export default () => {
  /* 직렬화 (Serialization) */

  /* Info
   *  - 객체를 직렬화 하여 전송 가능한 형태로 만든다.
   *
   *
   */
  passport.serializeUser((user, done) => {
    done(null, user.uid);
  });

  /* 역직렬화 (Deserialization) */

  /* Info
   *  - 직렬화된 파일 등을 역으로 직렬화 하여 다시 객체의 형태로 만든다.
   *
   *
   */
  passport.deserializeUser((id, done) => {
    Users.profileData(id, (result) => {
      delete result.password;

      done(null, result);
    });
  });

  local();
};
