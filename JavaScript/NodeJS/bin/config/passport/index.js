import passport from 'passport';
import Users from '../../core/routes/user/models/db_users.js';
import local from './local-mysql.js';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.uid);
  });

  passport.deserializeUser((id, done) => {
    Users.profileData(id, (result) => {
      delete result.password;

      done(null, result);
    });
  });

  local();
};
