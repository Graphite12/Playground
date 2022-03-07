import pool from '../../config/mysql_promise.js';
import postsModel from '../../models/db_post.js';

const boards = {
  /**
   * 글 리스트
   *
   * @param {*} req
   * @param {*} res
   */
  getList: (req, res) => {
    try {
      postsModel.renderList((result) => {
        if (result) {
          res.render('posts/post_listpage.ejs', {
            title: '게시글 리스트',
            list: result,
          });
        } else {
          res.redirect('/');
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  // <!-- <% page.forEach((pg, idx) =>{ %> -->
  //   <!-- <% }) %> -->
  /**
   * 페이지 네이션
   *
   * @param {*} req
   * @param {*} res
   */
  getListPagination: (req, res) => {
    /* 현재 페이지 */
    const curr_page = Number(req.params.page);
    /* 페이지 당 출력될 게시글 수 */
    const page_content_count = 10;

    /* Limit */
    let limits = 0;
    try {
      postsModel.renderPagination((result) => {
        /* 작성된 글 총 개수 */
        let total_post_count = result.length;

        /* 전체 페이지 수 */
        const total_page = Math.ceil(total_post_count / page_content_count);
        /* 페이지 버튼 개수 */
        const page_list_count = total_page;
        /* 전체 세트 수 */
        const total_target = Math.ceil(total_page / page_list_count);
        /* 현제 세트 번호 */
        const curr_target = Math.ceil(curr_page / page_list_count);
        /* 현재 세트 번호 시작 페이지 */
        const start_page = (curr_target - 1) * page_list_count + 1;
        /* 현제 세트 번호 마지막 페이지 */
        const end_page = start_page + page_list_count - 1;

        if (total_post_count < 0) total_post_count = 0;

        if (curr_page < 0) {
          limits = 0;
        } else {
          limits = (curr_page - 1) * page_content_count;
        }

        const data = {
          offset: limits,
          limit: page_content_count,
        };

        postsModel.renderLOPage(data, (result) => {
          console.log('페이지네이션 파라미터');
          console.log(req.params);
          console.log('페이지네이션 바디');
          console.log(req.body);
          console.log('페이지네이션 쿼리');
          console.log(req.query);
          console.log('페이지네이션 쿼리');
          console.log(total_post_count);
          console.log('페이지네이션 쿼리');
          console.log(page_content_count);
          console.log('페이지네이션 쿼리');
          console.log(page_list_count);
          console.log('페이지네이션 쿼리');
          console.log(curr_page);
          console.log('페이지네이션 쿼리');
          console.log(total_page);
          console.log('페이지네이션 쿼리');
          console.log(total_target);
          console.log('현재 페이지');
          console.log(curr_target);
          console.log('첫 페이지');
          console.log(start_page);
          console.log('마지막 페이지');
          console.log(end_page);

          res.render('posts/post_pagination.ejs', {
            data: result,
            total_post_count,
            page_content_count,
            page_list_count,
            curr_page,
            total_page,
            total_target,
            curr_target,
            start_page,
            end_page,
          });
        });
      });
    } catch (error) {
      res.json(error);
    }
  },

  /**
   * 작성된 글 보여주기
   * @param {*} req
   * @param {*} res
   */
  getPostView: (req, res) => {
    try {
      let { id } = req.params;

      if (!id) {
        res.json('이미 삭제된 글입니다.');
      }

      postsModel.getPostView(id, (result) => {
        if (result) {
          res.render('posts/post_viewpage.ejs', {
            data: result,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 글 작성 폼 보여주기
   *
   * @param {*} req
   * @param {*} res
   */
  getWriteForm: (req, res) => {
    res.render('posts/post_writepage.ejs', { title: '글 작성하기' });
  },

  /**
   * 글 작성 하기
   *
   * @param {*} req
   * @param {*} res
   */
  writePost: (req, res) => {
    try {
      let { name, subject, content } = req.body;
      let data = {
        name: name,
        subject: subject,
        content: content,
      };
      // console.log('c.글생성');
      // console.log(data);
      postsModel.insertPost(data, (result) => {
        if (result) {
          // console.log(result);
          res.redirect('/boards/list/' + 1);
        } else {
          res.redirect('/boards/write');
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 수정글 페이지 가져오기
   *
   * @param {*} req
   * @param {*} res
   */
  getEditView: (req, res) => {
    try {
      let { id } = req.params;
      postsModel.getPostView(id, (result) => {
        if (result) {
          res.render('posts/post_editpage.ejs', {
            title: '게시글 수정',
            data: result,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 글 수정하기
   * @param {*} req
   * @param {*} res
   */
  modifyPost: (req, res) => {
    try {
      let { id } = req.params;
      let { name, subject, content } = req.body;
      let data = {
        id: id,
        name: name,
        subject: subject,
        content: content,
      };

      postsModel.updatePost(data, (result) => {
        if (result) {
          res.redirect(`/boards/post/${id}`);
        } else {
          res.redirect(`/boards/list/edit/${id}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 글 삭제하기
   * @param {*} req
   * @param {*} res
   */
  removePost: (req, res) => {
    try {
      console.log('시작');

      let { id } = req.params;

      console.log(id);
      postsModel.deletePost(id, (result) => {
        if (result) {
          console.log(result);
          res.redirect('/boards/list/' + 1);
        } else {
          res.redirect('/boards/list/' + 1);
        }
      });
    } catch (error) {}
  },

  searchPost: (req, res) => {
    try {
    } catch (error) {}
  },

  cleanPostdb: (req, res) => {
    try {
      postsModel.cleaner();

      res.redirect(`/boards/list`);
    } catch (error) {
      res.json(error);
    }
  },
};

export default boards;
