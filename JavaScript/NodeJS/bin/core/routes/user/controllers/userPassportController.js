import userModel from '../models/db_users.js';

export default {
  /* 로그인 폼 불러오기 */
  getLoginForm: async (req, res, next) => {
    res.render('user/login/loginForm.ejs', {});
  },
  /* 회원가입 폼 불러오기 */
  getRegisterForm: async (req, res, next) => {
    res.render('user/register/registerForm.ejs');
  },

  getForgotPWDForm: async (req, res, next) => {
    res.render('user/login/forgotPWDForm.ejs');
  },

  /* 유저 로그인 */
  signIn: async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
    }
  },

  /* 유저 생성 */
  signUp: async (req, res, next) => {
    try {
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

  forgotPassword: async (req, res, next) => {
    try {
    } catch (error) {}
  },
};
