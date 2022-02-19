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
      postsModel.postView(id, (result) => {
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
      postsModel.getEditView(id, (result) => {
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
