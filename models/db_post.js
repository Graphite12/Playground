import run from '../config/mysql_pool.js';
import db_config from '../config/mysql.js';
const mysqlConn = db_config.init();
//연결 확인
db_config.connects(mysqlConn);
//run();
const postsModel = {
  /**
   * 게시글 리스트
   *
   * @param {*} cb 콜백함수
   */
  renderList: (cb) => {
    const sql = `SELECT * FROM POSTS ORDER BY id DESC`;
    mysqlConn.query(sql, (error, row, fields) => {
      if (error) {
        throw new Error(error);
      } else {
        console.log('db.글리스트');
        // console.log(row);
        // console.log(fields);
        cb(row);
      }
    });
  },

  /** DB, 게시글 보기
   *
   * 커뮤니티에 등록된 글을 클릭하면 게시글을 가져온다.
   *
   * @param {*} id: 게시글 번호
   * @param {*} cb: 콜백함수
   */
  postView: (id, cb) => {
    const sql = `SELECT * FROM POSTS WHERE id=?`;
    mysqlConn.query(sql, [id], (error, results, fields) => {
      if (error) {
        throw new Error(error);
      } else {
        console.log('postview');
        console.log(results);
        // console.log(fields);
        cb(results[0]);
      }
    });
  },

  /**
   * 게시글 작성
   * @param {*} data
   * @param {*} cb
   */
  insertPost: (data, cb) => {
    let sql = `INSERT INTO POSTS (name, subject, content, created_at) VALUES (?, ?, ?, NOW())`;
    let params = [data.name, data.subject, data.content];

    mysqlConn.query(sql, params, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      } else {
        console.log('db.글생성');
        console.log(fields);
        console.log(results);
        cb(results);
      }
    });
  },

  getEditView: (id, cb) => {
    let sql = 'SELECT * FROM POSTS WHERE id = ?';
    mysqlConn.query(sql, [id], (error, results, fields) => {
      if (error) {
        throw new Error(error);
      } else {
        console.log('geteditView');
        console.log(results);
        cb(results[0]);
      }
    });
  },

  /**
   * 게시글 수정
   * @param {*} data
   * @param {*} cb
   */

  updatePost: (data, cb) => {
    const sql = `UPDATE POSTS SET name = ?, subject = ?, content = ?, updated_at = NOW() WHERE id = ?`;
    const params = [data.name, data.subject, data.content, data.id];
    mysqlConn.query(sql, params, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      } else {
        console.log('db.글수정');

        console.log(results);
        cb(results);
      }
    });
  },
  /**
   *  게시글 삭제
   *
   *
   */
  deletePost: (id, cb) => {
    const sql = `DELETE FROM POSTS WHERE id=?`;
    console.log('번호' + id);
    mysqlConn.query(sql, [id], (error, results, fields) => {
      if (error) {
        throw new Error(error);
      }
      console.log(results);
      cb(results);
    });
  },

  cleaner: () => {
    const sql = 'TRUNCATE TABLE POSTS';
    mysqlConn.query(sql, (error, results, fields) => {
      if (error) {
        throw new Error(error);
      } else {
        console.log(results);
        return;
      }
    });
  },
};

export default postsModel;
