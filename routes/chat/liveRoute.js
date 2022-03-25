import express from 'express';

const liveRouter = express.Router();

// liveRouter.get('/', (req, res) => {
//   res.render('liveinvader/liveMain.ejs');
// });

liveRouter.get('/', (req, res) => {
  res.render('liveinvader/liveMain.ejs', { title: 'RTC 채팅 구현' });
});

liveRouter.post('/chat', (req, res) => {
  res.render('liveinvader/liveChat.ejs', {
    title: 'RTC 채팅 구현',
  });
});

export default liveRouter;
