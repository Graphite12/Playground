import Local from 'passport-local';
import Users from '../../core/routes/user/models/db_users.js';

const LocalStrategy = Local.Strategy;

export default (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    Users.profileData(id, (result) => {
      done(null, result[0]);
    });
  });

  passport.use(
    'local-signin',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (email, pwd, done) => {
        let data = {
          email,
          pwd,
        };
        Users.signInData(data, (result) => {
          switch (result) {
            case 'unknown':
              done(null, false, result.msg);
              break;

            case 'mail':
              done(null, false, result.msg);
              break;

            case 'pwd':
              done(null, false, result.msg);
              break;

            case 'notPwd':
              done(null, false, result.msg);
              break;

            default:
              done(null, result);
              break;
          }
        });
      },
    ),
  );
};
