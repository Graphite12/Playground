import Router from '../index.js';

/* 일반 로그인 */
import userController from './controllers/userController.js';

/* 패스포트 로그인 */

const userRouter = Router();

/* 로그인, 가입 폼 가져오기 */
userRouter.get('/signin', userController.getLoginForm);
userRouter.get('/signup', userController.getRegisterForm);

/* 로그인, 가입 데이터 DB전달 */
userRouter.post('/signinAf', userController.signIn);
userRouter.post('/signup', userController.signUp);

userRouter.get('/logout', userController.signOut);

export default userRouter;
