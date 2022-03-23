import express from 'express';
import { createServer } from 'http';
import https from 'https';
import path from 'path';
import mainRouter from './routes/main/mainRoute.js';
import liveRouter from './routes/chat/liveRoute.js';
import boardRouter from './routes/board/boardRoute.js';
import methodOverride from 'method-override';
import { Server } from 'socket.io';
//import liveinvaderController from './routes/chat/liveinvaderController.js';

let port = process.env.SPORT || 8080;

/**
 * __dirname을 활용
 */
const __dirname = path.resolve();

/* req.body 접근시 */

let app = express();
/*
   application/json 파싱
   body-parser 모듈 없이 express 내부적으로 지원이 된다.
*/
app.use(express.json());
app.use('/static', express.static(__dirname + '/static'));

/* 
   application/x-www-form-urlencoded  파싱
   
   내부적으로 
    true를 사용하면 qs 모듈을 사용
    false면 query-string 모듈을 사용
*/
app.use(express.urlencoded({ extended: true }));
/**
 * CRUD 구현을 위한 PUT, DELETE 사용
 * (methodOverride 미사용시 get, post만 사용 가능)
 */
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/'));

/* Cors(Cross Origin) */

// app.use('/', (req, res) => {
//   res.send('hello');
// })

/* 라우트 설정 */
app.use(mainRouter);
app.use('/boards', boardRouter);
app.use('/liveinvader', liveRouter);
// // app.use('/system');

/* http 실행 */
let httpServer = createServer(app);

const ws = new Server(httpServer, {
  cors: {
    origin: ['*'],
  },
});

ws.on('connection', (soc) => {
  console.log('ws 연결 성공 ');
});

httpServer.listen(port, () => {
  console.log(`연결 성공! *:${port}`);
});

// let e = ws.on('connection', function (soc) {
//   console.log('ws 연결성공' + soc);
// });
// console.log(e);
// Server생성자 함수를 활용해 http를 socketio서버로 실행

/* https 실행 */
/**
 * https ssl 인증서 옵션
 *
 * const sslOption = {
 *  key: ...,
 *  pem: ...
 * }
 */
// https.createServer(ssloption).listen(8443, ()=>{});

/* Socketio */
/**
 * io는 socket.io를 Import한 변수
 * io.on('connection', {})
 
 */

// ws.on('connection', (socket) => {
//   console.log('socketio 연결 성공');
//   console.log(socket);

//   //liveinvaderController(socket);

//   /* 이벤트 생성 및 연결  */
//   socket.on('message', (msg) => {
//     console.log('사용자 메세지', msg);

//     ws.emit('message', msg);
//   });

//   socket.on('disconnect', () => {
//     console.log('사용자 연결 종료');
//   });
// });
