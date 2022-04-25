import passport from 'passport';
import Users from '../../core/routes/user/models/db_users.js';
import local from './local.js';

export default () => {
  passport.serializeUser((user, done) => {
    console.log('사용자', user);
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    Users.profileData(id.uid, (result) => {
      console.log('아이디', id);
      console.log('보기', result);

      done(null, result[0]);
    });
  });

  local();
};
