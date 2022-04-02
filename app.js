import express from 'express';
import { createServer } from 'http';
import https from 'https';
import path from 'path';
import mainRouter from './routes/main/mainRoute.js';
import liveRouter from './routes/chat/liveChatRoute.js';
import boardRouter from './routes/board/boardRoute.js';
import methodOverride from 'method-override';
import { Server } from 'socket.io';
//import liveinvaderController from './routes/chat/liveinvaderController.js';

/* 유틸 */
import liveChatData from './utils/[Funcional]livechatUtill/liveChatData.js';
import {
  createUsers,
  getClientUser,
} from './utils/[Funcional]livechatUtill/liveUser.js';
import {
  createRoom,
  roomJoinUser,
} from './utils/[Funcional]livechatUtill/liveRoom.js';

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

  /* 방법 A */
  // let active_rooms = [];

  // let activeUser = {};

  /* 사용자 연결 */
  socket.on('connect', () => {});

  /* 사용자 추가 */
  socket.on('create_user', (data) => {
    let username = data.username;

    if (!username) {
      return {
        status: false,
        message: '사용자명을 입력하셈',
      };
    }

    let { userdata } = createUsers(socket.id, username);
    console.log(userdata[socket.id]);
    if (userdata) {
      //대기실에 모든 사용자에게 사용자 추가 됨을 시각적으로 알림
      ws.emit('update_main_userlist', { userdata: userdata[socket.id] });

      //해당 클라이언트(사용자 브라우저)에게 전달이벤트
      socket.emit('insert_user_data', { userdata: userdata[socket.id] });
    }
  });

  /* 방 생성 */
  socket.on('create_room', (data) => {
    let owner = getClientUser(socket.id);
    let roomid = liveChatData.roomList.length;
    let roomname = data.roomname;
    //모든 사용자들에게 방이 생성됨을 알림

    if (roomname) {
      if (owner === undefined) {
        return;
      }

      let room = createRoom(roomid, roomname, owner.username);

      socket.room = room[0].rname;

      roomJoinUser(owner, socket.room);

      ws.emit('update_main_chatroom', { roomlist: room });

      //채팅방 이용자들에게만 보여짐
      ws.to(socket.room).emit('user_join_inside_room', {
        username: owner,
      });
    }
  });

  /* 사용자 방 참여 */
  socket.on('user_join_room', (data) => {
    socket.join(data.room);
    ws.to(socket.room).emit('user_join_inside_room', { roomname: '방참여' });
  });

  /* 사용자 메세지 수신 */
  socket.on('send_message', (data) => {
    ws.to(data.roomname).emit('send_message', {
      username: data.username,
      msg: data.message,
    });
  });

  /* 사용자 채팅 입력중 */
  socket.on('isTyping', (data) => {
    socket.broadcast.to(data.roomname).emit('isTyping', data.username);
  });

  /* 사용자 연결 종료 */
  socket.on('disconnect', (data) => {});
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
