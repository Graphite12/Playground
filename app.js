import express from 'express';
import http from 'http';
import mainRouter from './routes/main/mainRoute.js';
import path from 'path';
const __dirname = path.resolve();

const app = express();

/* req.body 접근시 */

/*
   application/json 파싱
   body-parser 모듈 없이 express 내부적으로 지원이 된다.
*/
app.use(express.json());

/* 
   application/x-www-form-urlencoded  파싱
   
   내부적으로 
    true를 사용하면 qs 모듈을 사용
    false면 query-string 모듈을 사용
*/
app.use(express.urlencoded({ extended: true }));

/* ejs */

/**
 * 뷰엔진
 *
 * Views/ 폴더 내의 ejs파일 적용
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views/'));

// app.use('/', (req, res) => {
//   res.send('hello');
// })

/* 라우트 설정 */
app.use(mainRouter);

/* http 실행 */
http.createServer(app).listen(5000);
