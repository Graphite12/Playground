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
import liveUser from './utils/liveUser.js';

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

const { joinUser, getCurrentUser, leaveUser, getJoinedUser } = liveUser;

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
  const botName = 'LI Bot';

  socket.on('createRoom', (data) => {
    let existRoom = roomOption.existRoom(data);

    if (existRoom !== false) {
      socket.leave(socket.room);
      socket.join(data.roomName);
      socket.room = data.roomName;
    }
  });

  socket.on('joinRoom', (username, room) => {
    console.log('사용자id' + socket.id);
    //접속한 클라이언트 정보 저장 및 변수에 담기
    const user = joinUser(socket.id, username, room);

    //채팅방 접속
    socket.join(user.room);

    //채팅방에 접속한 유저 환영인사 (관리자, 메세지, 시간 출력)
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMsgTime(botName, `${user.username}님이 채팅방에 참여하셨습니다.`),
      );

    // 접속한 모든 유저에게 해당 룸에 접속유저 기록
    ws.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getJoinedUser(user.room),
    });

    // 사용자가 속한 방에만 메세지 등록
    socket.on('chatMessage', (msg) => {
      const user = getCurrentUser(socket.id);

      ws.to(user.room).emit('message', formatMsgTime(user.username, msg));
    });

    socket.on('disconnect', () => {
      const user = leaveUser(socket.id);

      if (user) {
        ws.to(user.room).emit(
          'message',
          formatMsgTime(botName, `${user.username}님이 방을 나갔습니다.`),
        );

        ws.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getJoinedUser(user.room),
        });
      }
    });

    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data);
    });
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
