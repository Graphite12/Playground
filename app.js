import express from 'express';
import http from 'http';
import mainRouter from './routes/main/main.js';

const app = express();

/* req.body 접근시 */
app.use(express.json());

/* application/x-www-form-urlencoded  파싱
   
   내부적으로 
    true를 사용하면 qs 모듈을 사용
    false면 query-string 모듈을 사용
*/
app.use(express.urlencoded({ extended: true }));

// app.use('/', (req, res) => {
//   res.send('hello');
// })

/* 라우트 설정 */
app.use(mainRouter);

/* http 실행 */
http.createServer(app).listen(5000);
