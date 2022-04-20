import express from 'express';
import checkAuth from '../../middlewares/checkTokenMiddleware.js';
import main from './controllers/mainController.js';

const mainRouter = express.Router();

mainRouter.get('/', checkAuth.isLogin, main.view);

export default mainRouter;
