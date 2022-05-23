import userModel from '../models/db_users.js';

export default {
  /* 로그인 폼 불러오기 */
  getLoginForm: async (req, res, next) => {
    res.render('user/login/loginForm', {});
  },
  /* 회원가입 폼 불러오기 */
  getRegisterForm: async (req, res, next) => {
    res.render('user/register/registerForm');
  },

  getForgotPWDForm: async (req, res, next) => {
    if (req.user === undefined) {
      return res.redirect('/');
    }

    res.render('user/login/resetPassForm', {
      userdata: req.user,
    });
  },

  /* 유저 생성 */
  signUp: async (req, res, next) => {
    try {
      let { email, password, confirmPassword, nickname } = req.body;

      let data = {
        email,
        password,
        confirmPassword,
        nickname,
      };

      userModel.signUpData(data, (result) => {
        console.log(result);

        if (result.status === 'error') {
          res.render('user/register/registerForm', {
            message: result.msg,
          });
        }

        if (result) {
          res.redirect('/users/signin');
        } else {
          res.redirect('/');
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  /* 유저 로그아웃 */
  signOut: async (req, res, next) => {
    try {
      req.logout();
      req.session.save(() => {
        res.redirect('/');
      });

      console.log('로그아웃', req.session);
    } catch (error) {
      console.log('로그아웃', error);
    }
  },

  /* 유저 프로필 */
  getUserProfile: async (req, res, next) => {
    try {
      let user = req.user;

      if (!user) {
        res.redirect('/error');
      }

      res.render(`user/profile/profile`, {
        userdata: user,
      });
    } catch (error) {
      console.log('프로필', error);
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { email, username, password, confirmPassword } = req.body;

      console.log('머임마', req.user);
      let data = {
        uid: req.user.uid,
        email,
        username,
        password,
        confirmPassword,
      };

      userModel.updateUserData(data, (result) => {
        if (result.status === 'error') {
          return res.render('user/login/resetPassForm', {
            message: result.msg,
          });
        } else {
          return res.redirect('/');
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  getUserList: async (req, res, next) => {
    userModel.getAllUser((result) => {
      console.log(result);

      delete result.password;

      res.render('user/profile/list', { result });
    });
  },
};
