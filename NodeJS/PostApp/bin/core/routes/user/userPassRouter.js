import Router from '../index.js';
import passport from 'passport';
import passportCtrl from './controllers/userPassMysql.js';
import local from '../../middlewares/passportLocal.js';

let userPassRouter = Router();

userPassRouter.get('/signin', local.isNotLogined, passportCtrl.getLoginForm);

userPassRouter.get('/signup', local.isNotLogined, passportCtrl.getRegisterForm);

userPassRouter.post(
  '/signinAf',
  local.isNotLogined,
  passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/users/signin',
  }),
);

userPassRouter.post('/signup', local.isNotLogined, passportCtrl.signUp);

userPassRouter.get('/logout', local.isLogined, passportCtrl.signOut);

userPassRouter.get('/:uname', local.isLogined, passportCtrl.getUserProfile);

userPassRouter.get('/userlist', passportCtrl.getUserList);

userPassRouter.get(
  '/reset-password',
  local.isLogined,
  passportCtrl.getForgotPWDForm,
);

userPassRouter.put(
  '/reset-password',
  local.isLogined,
  passportCtrl.resetPassword,
);

export default userPassRouter;
