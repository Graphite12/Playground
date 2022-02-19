import express from 'express';
import boards from './boardController.js';

const boardRouter = express.Router();

boardRouter.get('/', boards.getList);
boardRouter.get('/:id', boards.getPostView);
boardRouter.get('/write', boards.getWriteForm);
boardRouter.post('/write', boards.writePost);
boardRouter.get('/:id/edit', boards.getEditView);
boardRouter.patch('/:id/edit', boards.modifyPost);
// boardRouter.delete('/delete');
export default boardRouter;
