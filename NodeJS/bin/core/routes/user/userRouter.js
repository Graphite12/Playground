import { Router } from 'express';
import userController from './controllers/userController.js';
const userRouter = Router();

userRouter.get('/signin', userController.getLoginForm);
userRouter.get('/signup', userController.getRegisterForm);
userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
userRouter.get('/:id/profile');
userRouter.get('/logout');

export default userRouter;
