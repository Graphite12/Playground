import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Users from '../../core/routes/user/models/db_users.js';

export default () => {
  passport.use(
    'local-signin',
    new LocalStrategy(
      {
        // req.body의 객체로 등록된다.
        usernameField: 'email', //req.body.email
        passwordField: 'password', //req.body.password
        passReqToCallback: true, // express의 req객체에 접근 가능여부
      },
      async (req, email, password, done) => {
        try {
          let data = {
            email,
            password,
          };

          await Users.signInData(data, (result) => {
            if (result.status === 'success') {
              delete result.data.passowrd;

              return done(null, result.data);
            } else {
              return done(null, false, result.msg);
            }
          });
        } catch (error) {
          console.log(error);
          return done(error);
        }
      },
    ),
  );
};
