import express from 'express';
import checkAuthMiddleWare from '../../middlewares/checkAuth.js';
import main from './controllers/mainController.js';

const mainRouter = express.Router();

mainRouter.get('/', checkAuthMiddleWare, main.view);

export default mainRouter;
