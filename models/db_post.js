import db_config from '../config/mysql.js';
const mysqlConn = db.init();
//연결 확인
db_config.connect(mysqlConn);

const postsModel = {
  getList: (p) => {
    const sql = ``;
    mysqlConn.query();
  },

  getPost: (p) => {
    const sql = ``;
    mysqlConn.query();
  },

  writePost: (p) => {
    const sql = ``;
    mysqlConn.query();
  },

  updatePost: (p) => {
    const sql = ``;
    mysqlConn.query();
  },

  deletePost: (p) => {
    const sql = ``;
    mysqlConn.query();
  },
};

export default postsModel;
