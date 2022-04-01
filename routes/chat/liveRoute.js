import express from 'express';
import liveChatData from '../../utils/livechatData/liveChatData.js';
const liveRouter = express.Router();
const current_room = liveChatData.currentRoom;

// liveRouter.get('/', (req, res) => {
//   res.render('liveinvader/liveMain.ejs');
// });

liveRouter.get('/', (req, res) => {
  res.render('liveinvader/liveMain.ejs', { title: 'RTC 채팅 구현' });
});

liveRouter.get(`/chat/:roomname`, (req, res) => {
  //   if (rooms[req.params.room] === null) {
  //     return res.redirect('/');
  //   }
  console.log('리소스(uri패러미터) 요청');
  console.log(req.params);
  // console.log(current_room[req.params.roomid]);
  console.log('리소스(uri패러미터) 요청');

  const prevBtn = {
    name: '<',
    href: '/liveinvader',
  };

  res.render('liveinvader/liveChatRoom.ejs', {
    title: 'RTC 채팅 구현',
    prevBtn,
  });
});

export default liveRouter;
