import express from 'express';
import boards from './boardController.js';

const boardRouter = express.Router();

boardRouter.get('/', boards.getList);
// boardRouter.get('/:id/view', boards.getPostView);
boardRouter.get('/write', boards.getWriteForm);
boardRouter.post('/write_post', boards.writePost);

export default boardRouter;
