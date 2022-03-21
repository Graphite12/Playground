import db_config from '../config/mysql.js';
import { pool, getConnection } from '../config/mysql_pool.js';
import moment from 'moment';

const today = moment().format('YYYY-MM-DD||hh:mm:ss');
const mysqlConn = db_config.init();
//연결 확인
db_config.connect(mysqlConn);

const postsModel = {
  /**
   * 게시글 리스트
   *
   * @param {*} ctrl 콜백함수
   */
  renderList: async (ctrl) => {
    const sql = `SELECT * FROM POSTS ORDER BY id DESC`;
    let sql3 = `SELECT * FROM POSTS AS p JOIN (SELECT id FROM POSTS LIMIT 0, 20) AS t ON p.id = t.id ORDER BY t.id DESC`;
    let sql2 = `SELECT * FROM POSTS ORDER BY id LIMIT 0, 100`;

    /* mysql2 동기적 코드 */
    // mysqlConn.query(sql3, (error, rows, fields) => {
    //   if (error) {
    //     throw new Error(error);
    //   } else {
    //     console.log('오늘' + today);
    //     // console.log('db. row를 까보자');
    //     // console.log(rows);
    //     // console.log(fields);
    //     ctrl(rows);
    //   }
    // });

    /* mysql2 비동기적 코드 */
    const [item, fields] = await pool.query(sql3);
    await ctrl(item);

    /* getConnection 사용 시  */
    // getConnection(async (conn) => {
    //   const [item, fields] = await conn.query(sql3);
    //   await ctrl(item)
    //   conn.release();
    // });
  },

  /**
   * 게시글 페이지네이션
   * @param {*} ctrl // 컨트롤러로 전달함수
   */
  renderPagination: async (ctrl) => {
    //무지성 긁어오기
    let sql = `SELECT count(*) as cnt FROM POSTS`;
    //Offset Limit 설정해서 긁어오기
    let sql2 = `SELECT * FROM POSTS ORDER BY id LIMIT 0, 20`;
    //JOIN 페이징
    let sql3 = `SELECT * FROM POSTS AS p JOIN (SELECT id FROM POSTS ORDER BY id DESC LIMIT 0, 20) AS t ON p.id = t.id `;
    // 커버링 인덱스 사용법(이방법은 테이블 수정 이후 가능)
    let sql4 = `SELECT id, post_no, post_type, name FROM POSTS WHERE created_at >= 2000-01-01 LIMIT 500000, 10`;

    /* mysql2 동기적 코드 */
    // mysqlConn.query(sql3, (error, rows) => {
    //   if (error) {
    //     throw new Error(error);
    //   } else {
    //     // console.log('페이지 네이션');
    //     // console.log(rows);
    //     ctrl(rows);
    //   }
    // });

    /* mysql2 비동기적 코드 */
    const [item, fields] = await pool.query(sql3);

    await ctrl(item);

    /* getConnection 사용 시  */
    // getConnection(async (conn) => {
    //   const [item, fields] = await pool.query(sql3);
    //   await ctrl(item)
    //   conn.release();
    // });
  },

  /**
   * 컨텐츠 페이지 네이션
   *
   * @param {*} data
   * @param {*} ctrl
   */
  renderLOPage: async (data, ctrl) => {
    let sql = `SELECT * FROM POSTS ORDER BY id DESC limit ?,? `;
    const { offset, limit } = data;

    /* mysql2 동기적 코드 */
    // mysqlConn.query(sql1, [offset, limit], (error, rows) => {
    //   if (error) {
    //     throw new Error(error);
    //   } else {
    //     // console.log('페이지 네이션');
    //     // console.log(rows);
    //     ctrl(rows);
    //   }
    // });

    /* mysql2 비동기적 코드 */
    const [item, fields] = await pool.query(sql, [offset, limit]);

    await ctrl(item);
  },

  /** 작성된 글 보기
   *
   * 등록된 글을 클릭하면 내용을 가져온다.
   *
   * @param {*} id: 게시글 번호
   * @param {*} cb: 콜백함수
   */
  getPostView: async (id, cb) => {
    const sql = `SELECT * FROM POSTS WHERE id=?`;

    /* mysql2 동기적 코드 */
    // mysqlConn.query(sql, id, (error, results, fields) => {
    //   if (error) {
    //     throw new Error(error);
    //   } else {
    //     console.log('db. 작성된 글');
    //     console.log(results);
    //     console.log(id);
    //     // console.log(fields);
    //     cb(results[0]);
    //   }
    // });

    /* mysql2 비동기적 코드 */
    const [item, fields] = await pool.query(sql, [id]);

    await cb(item);
  },

  /**
   * 게시글 작성
   * @param {*} data
   * @param {*} cb
   */
  insertPost: async (data, cb) => {
    let sql = `INSERT INTO POSTS (name, subject, content, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`;
    let params = [data.name, data.subject, data.content];

    /* mysql2 동기적 코드 */
    // mysqlConn.query(sql, params, (error, results, fields) => {
    //   if (error) {
    //     throw new Error(error);
    //   } else {
    //     console.log('db.글생성');
    //     console.log(fields);
    //     console.log(results);
    //     cb(results);
    //   }
    // });

    /* mysql2 비동기적 코드 */
    const [item, fields] = await pool.query(sql, params);

    await cb(item);
  },

  /**
   * 수정할 게시글 데이터 가져오기
   *
   * @param {*} id
   * @param {*} cb
   */
  getEditPostView: async (id, cb) => {
    let sql = 'SELECT * FROM POSTS WHERE id = ?';

    /* mysql2 동기적 코드 */
    // mysqlConn.query(sql, [id], (error, results, fields) => {
    //   if (error) {
    //     throw new Error(error);
    //   } else {
    //     console.log('geteditView');
    //     console.log(results);
    //     cb(results[0]);
    //   }
    // });

    /* mysql2 비동기적 코드 */
    const [item, fields] = await pool.query(sql, [id]);

    await cb(item);
  },

  /**
   * 게시글 수정
   * @param {*} data
   * @param {*} cb
   */

  updatePost: async (data, cb) => {
    const sql = `UPDATE POSTS SET name = ?, subject = ?, content = ?, updated_at = ? WHERE id = ?`;
    const params = [
      data.id,
      data.name,
      data.subject,
      data.content,
      CURRENT_TIMESTAMP,
    ];

    /* mysql2 동기적 코드 */
    // mysqlConn.query(sql, params, (error, results, fields) => {
    //   if (error) {
    //     throw new Error(error);
    //   } else {
    //     console.log('db.글수정');

    //     console.log(results);
    //     cb(results);
    //   }
    // });

    /* mysql2 비동기적 코드 */
    const [item, fields] = await pool.query(sql, params);

    await cb(item);
  },

  /**
   * 게시글 삭제
   *
   * @param {*} id
   * @param {*} cb
   */
  deletePost: async (id, cb) => {
    const sql = `DELETE FROM POSTS WHERE id=?`;
    console.log('번호' + id);

    /* mysql2 동기적 코드 */
    // mysqlConn.query(sql, [id], (error, results, fields) => {
    //   if (error) {
    //     throw new Error(error);
    //   }
    //   console.log(results);
    //   cb(results);
    // });

    /* mysql2 비동기적 코드 */
    const [item, fields] = await pool.query(sql, [id]);

    await cb(item);
  },

  /**
   * 게시글 검색
   * @param {*} cb
   */
  searchPost: (cb) => {},

  /**
   * POSTS 테이블 청소
   */
  cleaner: async () => {
    const sql = 'TRUNCATE TABLE POSTS';
    // mysqlConn.query(sql, (error, results, fields) => {
    //   if (error) {
    //     throw new Error(error);
    //   } else {
    //     console.log(results);
    //   }
    // });

    /* mysql2 비동기적 코드 */
    const [item, fields] = await pool.query(sql);

    console.log(item);
  },
};

export default postsModel;
