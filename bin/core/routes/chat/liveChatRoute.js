import express from 'express';
// import { Server } from 'socket.io';
// let ws = new Server(httpServer, { cors: { origin: '*' } });
const liveRouter = express.Router();

liveRouter.get('/', (req, res) => {
  res.render('liveChat/liveChatMain.ejs', { title: 'RTC 채팅 구현' });
});

liveRouter.get('/room', (req, res) => {});
liveRouter.get('/:room', (req, res) => {
  console.log(req.params);
  console.log(req.path);
  res.render('liveChat/liveChatRoom.ejs', { room: req.params.room });
});
/* Route */

// liveRouter.get(`/:room`, (req, res) => {
//   console.log('리소스(uri패러미터) 요청');
//   console.log(req.params);
//   console.log('리소스(uri패러미터) 요청');

//   res.render('liveinvader/liveChatRoom.ejs', {
//     title: 'RTC 채팅 구현',
//   });
// });

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

export default liveRouter;
