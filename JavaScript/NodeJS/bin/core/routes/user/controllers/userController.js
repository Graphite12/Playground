import userModel from '../models/db_users.js';

export default {
  /* 로그인 폼 불러오기 */
  getLoginForm: async (req, res, next) => {
    let userMail;

    if (req.cookies.rememberUMail !== undefined) {
      console.log('사용자 아이디 존재함');
      userMail = req.cookies.rememberUMail;
    }

    res.render('user/login/loginForm.ejs', {
      usermail: userMail,
    });
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
      const { email, password } = req.body;

      const data = {
        email,
        password,
      };

      userModel.signInData(data, (result) => {
        console.log('결과', result);

        /* INPUT에 입력한 내용이 없을 때 (이건 필요없을 거같음) */
        if (result.status === 'unknown') {
          res.render('user/login/loginForm.ejs', { msg: result.msg });
        }

        /* 이메일 INPUT에 입력값이 없을 때  */
        if (!result.status === 'mail') {
          res.render('user/login/loginForm.ejs', { msg: result.msg });
        }

        /* 비밀번호 INPUT에 입력값이 없을 때  */
        if (result.status === 'pwd') {
          res.render('user/login/loginForm.ejs', { msg: result.msg });
        }

        if (result.status === 'notPwd') {
          res.render('user/login/loginForm.ejs', { msg: result.msg });
        }

        /* 쿠키에 담아서 로그인시 이메일 자동완성 */
        if (req.body.mem_email === 'check') {
          res.cookie('rememberUMail', result.email, {
            path: '/',
            secure: process.env.NODE_ENV === 'production' ? true : false,
            httpOnly: true,
            maxAge: 5 * 10000,
          });
        } else {
          res.clearCookie('rememberUMail');
        }
        /* 쿠키만 사용했을 떄*/
        // res
        //   .cookie(
        //     'user',
        //     { isLogin: true, uid: result.uid },
        //     {
        //       path: '/',
        //       secure: process.env.NODE_ENV === 'production' ? true : false,
        //       httpOnly: true,
        //       maxAge: 15 * 10000,
        //     },
        //   )
        //   .status(301)
        //   .redirect('/');

        /* 세션을 사용했을 때 */
        req.session.uid = result.uid;
        req.session.isLogined = true;
        req.session.save(() => {
          res.redirect('/');
        });
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

        if (result.status === 'email') {
          res.render();
        }

        if (result.status === 'existMail') {
          res.render();
        }

        if (result.status === 'pwd') {
          res.render();
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
      // if (!req.cookies.user) {
      //   return;
      // }

      if (!req.session.uid) {
        res.redirect('/');
      }

      req.session.isLogined = false;
      delete req.session.uid;
      req.session.save(() => {
        res.redirect('/');
      });

      // res.clearCookie('user').redirect('/');
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
