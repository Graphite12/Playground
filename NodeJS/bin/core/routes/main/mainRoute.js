import express from 'express';
import main from './controllers/mainController.js';

const mainRouter = express.Router();

mainRouter.get('/', main.view);

export default mainRouter;
