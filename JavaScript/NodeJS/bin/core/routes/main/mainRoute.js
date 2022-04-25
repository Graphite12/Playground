import express from 'express';
import local from '../../middlewares/passportLocal.js';
import main from './controllers/mainController.js';

const mainRouter = express.Router();

mainRouter.get('/', local.isLogined, main.view2);

export default mainRouter;
