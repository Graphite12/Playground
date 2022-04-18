import { Router } from 'express';
import userController from './controllers/userController.js';
const userRouter = Router();

/* 로그인, 가입 폼 가져오기 */
userRouter.get('/signin', userController.getLoginForm);
userRouter.get('/signup', userController.getRegisterForm);

/* 로그인, 가입 데이터 DB전달 */
userRouter.post('/signin', userController.signIn);
userRouter.post('/signup', userController.signUp);

/* 기타 등등 */
userRouter.get('/:id/profile');
userRouter.get('/logout');

export default userRouter;
