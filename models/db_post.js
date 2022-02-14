import db_config from '../config/mysql.js';
const mysqlConn = db_config.init();
//연결 확인
db_config.connects(mysqlConn);

const postsModel = {
  /**
   * 게시글 리스트
   *
   * @param {*} cb 콜백함수
   */
  postsList: (cb) => {
    const sql = `SELECT * FROM POSTS`;
    mysqlConn.query(sql, (error, row, fields) => {
      if (error) {
        res.json(error);
      } else {
        console.log(fields);
        cb(row);
      }
    });
  },
  //    * DB, 게시글 보기
  //    *
  //    * 커뮤니티에 등록된 글을 클릭하면 게시글을 가져온다.
  //    *
  //    * @param {*} id: 게시글 번호
  //    * @param {*} cb: 콜백함수
  //    */
  //   //   postView: (id, cb) => {
  //   //     const sql = `SELECT id, name, subject, content, created_at, updated_at FROM POSTS WHERE id=? LIMIT 1`;
  //   //     mysqlConn.query(sql, [id], (error, results, fields) => {
  //   //       if (error) {
  //   //         res.json(error);
  //   //       } else {
  //   //         console.log(results);
  //   //         console.log(fields);
  //   //         cb(results);
  //   //       }
  //   //     });
  //   //   },
  /**
   *  게시글 작성
   *
   *
   */
  createPost: (data, cb) => {
    let sql = `INSERT INTO POSTS (name, subject, content, created_at) VALUES (?, ?, ?, NOW())`;
    let params = [data.name, data.subject, data.content];
    mysqlConn.query(sql, params, (error, results, fields) => {
      if (error) {
        res.json(error);
      } else {
        console.log(fields);
        console.log(results);
        cb(results);
      }
    });
  },
  //   /**
  //    *  게시글 수정
  //    *
  //    *
  //    */
  //   updatePost: (p) => {
  //     const sql = ``;
  //     mysqlConn.query();
  //   },
  //   /**
  //    *  게시글 삭제
  //    *
  //    *
  //    */
  //   deletePost: (p) => {
  //     const sql = ``;
  //     mysqlConn.query();
  //   },
};

export default postsModel;
