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
    try {
      let total_page_count = 0;
      const current_page = req.params.page || 1;
      const page_size = 10;
      const page_list_size = 10;
      postsModel.renderListPasing((result) => {
        total_page_count = result.length;

        /* 전체 페이지 수 */
        const total_page = Math.ceil(total_page_count / page_size);

        /* 전체 세트 수 */
        const total_list = Math.ceil(total_page / page_list_size);

        /* 현재 페이지 */
        const curr_page = Math.ceil(current_page / page_list_size);
        const first_page = (curr_page - 1) * 10 + 1;
        const last_page = first_page + page_list_size - 1;

        const pagenations = {
          page_size,
          total_list,
          current_page,
          total_page,
          first_page,
          last_page,
        };

        postsModel.renderListPasing((result) => {});

        console.log(result.length);
        console.log(current_page);
        console.log(total_page);
        console.log(total_list);
        console.log(curr_page);
        console.log(first_page);
        console.log(last_page);

        console.log('페이지네이션 파라미터');
        console.log(req.params);
        console.log('페이지네이션 바디');
        console.log(req.body);
        console.log('페이지네이션 쿼리');
        console.log(req.query);

        res.render('posts/post_pagination.ejs', {
          data: result,
          page: pagenations,
        });
      });
    } catch (error) {}
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
          res.redirect('/boards/list');
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
          res.redirect(`/boards/list`);
        } else {
          res.redirect(`/boards/list`);
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
