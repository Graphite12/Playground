import express from 'express';
import {
  rooms,
  users,
} from '../../../utils/[Class]livechatData/newInstance.js';

const chatRouter = express.Router();

console.log('클라이언트방', rooms.rooms);
console.log('클라이언트유저', users.users);

chatRouter.get('/', (req, res) => {
  res.render('liveChat/liveChatMain.ejs', {
    title: 'RTC 채팅 구현',
    userlist: users.users,
    roomlist: rooms.rooms,
  });
});

chatRouter.get('/:room', (req, res) => {
  console.log(req.params);
  console.log(req.path);
  res.render('liveChat/liveChatRoom.ejs', {
    room: req.params.room,
  });
});

/* socketio 시작*/

/* 간단한 룸 */
// ws.on('connection', (socket) => {
//   console.log('정상 접속 확인');
//   console.log('접속한 클라이언트ID' + socket.id);
//   console.log('정상 접속 확인');

//   socket.on('disconnect', () => {
//     console.log('사용자 종료');
//   });
// });

// /* 네임스페이스 */

// const lc = ws.of('/livechat');
// lc.on('connection', (socket) => {
//   chat1.emit('livechat1', { chat: 'someone chat1' });
// });

// const gs = ws.of('/global');
// gs.on('connection', (socket) => {
//   gs.emit('livechat2', { chat: 'someone chat2' });
// });

export default chatRouter;
