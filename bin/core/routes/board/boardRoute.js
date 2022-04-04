import express from 'express';
import boards from '../../controller/boardController.js';

const boardRouter = express.Router();

// /* 게시글 리스트 */
// boardRouter.get('/list/:id', boards.getList);

/* 게시글 리스트 페이지네이션 */
boardRouter.get('/list/:page', boards.getListPagination);

/* 게시글 작성 폼 가져오기 */
boardRouter.get('/write', boards.getWriteForm);

/* 게시글 작성 */
boardRouter.post('/write', boards.writePost);

/* 게시글 보기 */
boardRouter.get('/post/:id', boards.getPostView);

/* 게시글 수정 폼 가져오기 */
boardRouter.get('/post/edit/:id', boards.getEditView);

/* 게시글 수정 */
boardRouter.post('/post/edit/:id', boards.modifyPost);

/* 게시글 삭제 */
boardRouter.post('/post/delete/:id', boards.removePost);

/* POSTS DB indexing 청소 */
boardRouter.post('/cleaner', boards.cleanPostdb);

export default boardRouter;
