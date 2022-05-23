import express from 'express';
import local from '../../middlewares/passportLocal.js';
import main from './controllers/mainController.js';

const mainRouter = express.Router();

mainRouter.get('/', main.view);
mainRouter.get('/error', main.error);

export default mainRouter;
