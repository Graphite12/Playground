import { Router } from 'express';
import passport from 'passport';
import passportCtrl from './controllers/userPassportController.js';
import local from '../../middlewares/passportLocal.js';

let userPassRouter = Router();

userPassRouter.get('/signin', local.isNotLogined, (req, res, next) => {
  res.render('user/login/loginForm.ejs');
});

userPassRouter.get('/signup', (req, res, next) => {
  res.render('user/register/registerForm.ejs');
});

userPassRouter.post(
  '/signinAf',
  local.isNotLogined,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/signin',
  }),
);

userPassRouter.post('/signup');
// userPassRouter.get('/logout', local.isLogined);

export default userPassRouter;
