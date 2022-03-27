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

/* 유틸 */
import formatMsgTime from './utils/liveMessage.js';
import { LiveUser, LiveUsers } from './utils/liveUser.js';
import { liveRoom } from './utils/liveRoom.js';

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

ws.on('connection', (socket) => {
  console.log('socketio 연결 성공');

  // console.log(socket);

  //liveinvaderController(socket);

  /* 이벤트 생성 및 연결(Base) */

  // 전체 메세지

  //접속자 제외한 모든 사용자에게 메세지
  // socket.broadcast.emit('message');

  // socket.on('chatMessage', (msg) => {
  //   ws.emit('message', '메세지')
  // });

  // socket.on('disconnect', () => {
  //   console.log('사용자 연결 종료');
  // });

  /* 방법A. Room */
  let users = {};
  let active_rooms = [];
  const { createUsers, getCurrentUser } = LiveUsers;
  const { createRoom, existRoom } = liveRoom;

  socket.on('create_user', (data) => {
    let username = data.username;

    //클라이언트에서 넘어온 사용자명이 존재한다면
    if (username) {
      //socket 동적 Property 생성(username)후 사용자 저장
      socket.username = username;

      //유저 생성
      let user = createUsers(socket.id, socket.username);
      console.log(user);

      users.uid = user;

      console.log(users);
      console.log('유저데이터' + JSON.stringify(data));
    }

    ws.emit('update_chat_user', users);
    socket.emit('update_chat_rooms', { rooms: active_rooms });
  });

  /* 방 생성 */
  socket.on('create_room', (data) => {
    console.log(JSON.stringify(data));

    let subject = data.subject;

    if (subject) {
      let owner = users[socket.id];
      let id = chatRoom.length;

      let room = createRoom(subject, id, owner);

      socket.room = room.subject;
      socket.join(socket.room);
    }
  });

  /* 사용자 룸에 연결됨 */
  socket.on('join_room', (room) => {
    socket.join(room);
  });

  /* 사용자 정보 받아 저장 */
  socket.on('add_user', () => {});

  /* 사용자 메세지 수신 */
  socket.on('send_message', () => {});

  /* 사용자 채팅 입력중 */

  /* 사용자 연결 종료 */
  socket.on('disconnected', (data) => {
    let user = users.user.id;
  });
});

/* 방법B. Namespace */
const chat1 = ws.of('/livechat1');
chat1.on('connection', (socket) => {
  chat1.emit('livechat1', { chat: 'someone chat1' });
});

const chat2 = ws.of('/livechat2');
chat2.on('connection', (socket) => {
  chat2.emit('livechat2', { chat: 'someone chat2' });
});
