import postsModel from '../../models/db_post';

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
    } catch (error) {}
  },

  /**
   * 글 작성 폼 보여주기
   * @param {*} req
   * @param {*} res
   */
  getWriteForm: (req, res) => {
    res.render('posts/post_write.ejs');
  },

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

      postsModel.createPost(data, (result) => {
        if (result) {
          console.log(result);
        } else {
          res.redirect('/posts/');
        }
      });
    } catch (error) {}
  },
};
