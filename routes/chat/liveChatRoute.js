import express from 'express';
import liveChatData from '../../utils/[Funcional]livechatUtill/liveChatData.js';
const liveRouter = express.Router();
const current_room = liveChatData.currentRoom;

liveRouter.get('/', (req, res) => {
  res.render('liveinvader/liveMain.ejs', { title: 'RTC 채팅 구현' });
});

// liveRouter.get(`/:room`, (req, res) => {
//   console.log('리소스(uri패러미터) 요청');
//   console.log(req.params);
//   console.log('리소스(uri패러미터) 요청');

//   res.render('liveinvader/liveChatRoom.ejs', {
//     title: 'RTC 채팅 구현',
//   });
// });

export default liveRouter;
