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
  /* 유저 생성 */
  signUp: async (req, res, next) => {
    console.log('회원가입정보', req.body);

    let { email, password, confirmPassword, nickname } = req.body;

    let data = {
      email,
      password,
      confirmPassword,
      nickname,
    };

    userModel.signUpData(data, (result) => {
      console.log(result);
    });
    try {
    } catch (error) {}
  },
  /* 유저 로그인 */
  signIn: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      userModel.signIn();
    } catch (error) {}
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
