import express from 'express';

const liveRouter = express.Router();
const current_room = {};
// liveRouter.get('/', (req, res) => {
//   res.render('liveinvader/liveMain.ejs');
// });

liveRouter.get('/', (req, res) => {
  res.render('liveinvader/liveMain.ejs', { title: 'RTC 채팅 구현' });
});

liveRouter.get(`/chat/:roomid`, (req, res) => {
  //   if (rooms[req.params.room] === null) {
  //     return res.redirect('/');
  //   }
  console.log('리소스 요청');
  console.log(req.params);
  console.log('리소스 요청');

  if (current_room[req.params.roomid] === null) {
    return res.redirect('/liveinvader');
  }

  res.render('liveinvader/liveChat.ejs', {
    title: 'RTC 채팅 구현',
  });
});

export default liveRouter;
