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
      postsModel.postsList((result) => {
        if (result) {
          res.render('posts/post_list.ejs', {
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
   * 글 작성 폼 보여주기
   *
   * @param {*} req
   * @param {*} res
   */
  getWriteForm: (req, res) => {
    res.render('posts/post_write.ejs');
  },

  /**
   * 작성된 글 보여주기
   * @param {*} req
   * @param {*} res
   */
  getPostView: (req, res) => {
    try {
      let { id } = req.params;
      postsModel.postView(id, (result) => {
        if (result) {
          console.log(result);
          res.render('posts/post_view.ejs', {
            title: result.subject,
            post: result,
          });
        }
      });
    } catch (error) {}
  },

  /**
   * 글 작성 하기
   *
   * @param {*} req
   * @param {*} res
   */
  writePost: (req, res) => {
    try {
      let { body } = req;
      let data = {
        name: body.name,
        subject: body.subject,
        content: body.content,
      };
      console.log('c.글생성');
      console.log(data);
      postsModel.createPost(data, (result) => {
        if (result) {
          console.log(result);
          res.redirect('/post');
        } else {
          res.redirect('/');
        }
      });
    } catch (error) {}
  },

  /**
   * 글 수정하기
   * @param {*} req
   * @param {*} res
   */
  modifyPost: (req, res) => {
    try {
    } catch (error) {}
  },

  /**
   * 글 삭제하기
   * @param {*} req
   * @param {*} res
   */
  deletePost: (req, res) => {
    try {
    } catch (error) {}
  },
};

export default boards;
