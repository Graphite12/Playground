import express from 'express';
import { createServer as newHttp } from 'http';
import { Server } from 'socket.io';
import { createServer as newHttps } from 'https';
import path from 'path';
import methodOverride from 'method-override';
import socket from './bin/utils/socket.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportConfig from './bin/config/passport/index.js';
import sessionOption from './bin/config/session/index.js';
import session from 'express-session';

/* 라우터 */
import userRouter from './bin/core/routes/user/userRouter.js';
import liveRouter from './bin/core/routes/chat/liveChatRoute.js';
import boardRouter from './bin/core/routes/board/boardRoute.js';
import mainRouter from './bin/core/routes/main/mainRoute.js';

import userPassRouter from './bin/core/routes/user/userPassRouter.js';
import socialRouter from './bin/core/routes/OAuth/oauthRouter.js';

/* 유틸 */

let port = process.env.SPORT || 8080;

/**
 * __dirname을 활용
 */
const __dirname = path.resolve();

let app = express();
/*
   application/json 파싱
   body-parser 모듈 없이 express 내부적으로 지원이 된다.
*/
app.use(express.json());
app.use('/static', express.static(`${__dirname}/bin/core` + '/static'));

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

/* 쿠키 추가 */
app.use(cookieParser());

/* 세션 추가 */
app.use(session(sessionOption));

/* 패스포트 셋팅 */
passportConfig();
// express req 객체에 passport 추가
app.use(passport.initialize());
// express session에 passport 정보 저장. session 미들웨어보다 아래에 위치해야함.
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', path.join(`${__dirname}/bin/core`, 'views/'));

/* Cors(Cross Origin) */

// app.use('/', (req, res) => {
//   res.send('hello');
// })

/* 라우트  설정 */
app.use(mainRouter);
app.use('/boards', boardRouter);
app.use('/livechat', liveRouter);
//app.use('/users',userRouter);
app.use('/users', userPassRouter);
app.use('/auth', socialRouter);
/* http 실행 */
const httpServer = newHttp(app).listen(port, () => {
  console.log(`연결 성공! *:${port}`);
});

/* https 실행 */
const httpsServer = newHttps();

const ws = new Server(httpServer);

socket(ws);

/* app Module */
export default app;

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

// let ws = new Server(httpServer, { cors: { origin: '*' } });

// ws.on('connection', (socket) => {
//   console.log('Socket.io 접속 성공');
//   console.log('클라이언트 Socket.id', socket.id);

//   liveChatConroller(ws, socket);
// });
// ws.on('connection', (socket) => {
//   console.log('socketio 연결 성공');

//   // console.log(socket);

//   //liveinvaderController(socket);

//   /* 이벤트 생성 및 연결(Base) */

//   // 전체 메세지

//   //접속자 제외한 모든 사용자에게 메세지
//   // socket.broadcast.emit('message');

//   // socket.on('chatMessage', (msg) => {
//   //   ws.emit('message', '메세지')
//   // });

//   // socket.on('disconnect', () => {
//   //   console.log('사용자 연결 종료');
//   // });

//   /* 방법 A */
//   // let active_rooms = [];

//   // let activeUser = {};

//   /* 사용자 연결 */
//   socket.on('connect', () => {});

//   /* 사용자 추가 */
//   socket.on('create_user', (data) => {
//     let username = data.username;

//     if (!username) {
//       return {
//         status: false,
//         message: '사용자명을 입력하셈',
//       };
//     }

//     let { userdata } = createUsers(socket.id, username);
//     console.log(userdata[socket.id]);
//     if (userdata) {
//       //대기실에 모든 사용자에게 사용자 추가 됨을 시각적으로 알림
//       ws.emit('update_main_userlist', { userdata: userdata[socket.id] });

//       //해당 클라이언트(사용자 브라우저)에게 전달이벤트
//       socket.emit('insert_user_data', { userdata: userdata[socket.id] });
//     }
//   });

//   /* 방 생성 */
//   socket.on('create_room', (data) => {
//     let owner = getClientUser(socket.id);
//     let roomid = liveChatData.roomList.length;
//     let roomname = data.roomname;
//     //모든 사용자들에게 방이 생성됨을 알림

//     if (roomname) {
//       if (owner === undefined) {
//         return;
//       }

//       let room = createRoom(roomid, roomname, owner.username);

//       socket.room = room[0].rname;

//       roomJoinUser(owner, socket.room);

//       ws.emit('update_main_chatroom', { roomlist: room });

//       //채팅방 이용자들에게만 보여짐
//       ws.to(socket.room).emit('user_join_inside_room', {
//         username: owner,
//       });
//     }
//   });

//   /* 사용자 방 참여 */
//   socket.on('user_join_room', (data) => {
//     socket.join(data.room);
//     ws.to(socket.room).emit('user_join_inside_room', { roomname: '방참여' });
//   });

//   /* 사용자 메세지 수신 */
//   socket.on('send_message', (data) => {
//     ws.to(data.roomname).emit('send_message', {
//       username: data.username,
//       msg: data.message,
//     });
//   });

//   /* 사용자 채팅 입력중 */
//   socket.on('isTyping', (data) => {
//     socket.broadcast.to(data.roomname).emit('isTyping', data.username);
//   });

//   /* 사용자 연결 종료 */
//   socket.on('disconnect', (data) => {});
// });

/* 방법B. Namespace */
