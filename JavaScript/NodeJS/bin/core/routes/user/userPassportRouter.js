import { Router } from 'express';
import passport from 'passport';
import Local from 'passport-local';
const LocalStrategy = Local.Strategy;

let userPassRouter = Router();

userPassRouter.get('/signin', (req, res, next) => {
  res.render('user/login/loginForm.ejs');
});
userPassRouter.get('/signup');
userPassRouter.post(
  '/signinAf',
  passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/user/signin',
  }),
);
userPassRouter.post('/signup');

export default userPassRouter;
