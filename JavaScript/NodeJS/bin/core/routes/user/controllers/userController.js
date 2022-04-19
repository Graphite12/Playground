import userModel from '../models/db_users.js';
import bcrypt from 'bcrypt';

export default {
  /* 로그인 폼 불러오기 */
  getLoginForm: async (req, res, next) => {
    res.render('user/login/loginForm.ejs');
  },
  /* 회원가입 폼 불러오기 */
  getRegisterForm: async (req, res, next) => {
    res.render('user/register/registerForm.ejs');
  },

  /* 유저 로그인 */
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const data = {
        email,
        password,
      };

      userModel.signInData(data, (result) => {
        console.log(result);

        if (result) {
          res
            .cookie('users', result.uid, {
              path: '/',
              secure: process.env.NODE_ENV === 'production' ? true : false,
              httpOnly: true,
              maxAge: 5 * 10000,
            })
            .status(302)
            .redirect('/');
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  /* 유저 생성 */
  signUp: async (req, res, next) => {
    console.log('회원가입정보', req.body);
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
    } catch (error) {}
  },
  /* 유저 프로필 */
  getUserProfile: async (req, res, next) => {
    try {
    } catch (error) {}
  },
};
