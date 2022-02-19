import express from 'express';
import boards from './boardController.js';

const boardRouter = express.Router();

boardRouter.get('/list', boards.getList);
// boardRouter.get('/list/:id', boards.getList);
boardRouter.get('/write', boards.getWriteForm);
boardRouter.post('/write', boards.writePost);
boardRouter.get('/post/:id', boards.getPostView);
boardRouter.get('/post/edit/:id', boards.getEditView);
boardRouter.post('/post/edit/:id', boards.modifyPost);
boardRouter.post('/post/delete/:id', boards.removePost);
boardRouter.post('/cleaner', boards.cleanPostdb);

export default boardRouter;
