import express from 'express';

const liveRouter = express.Router();

liveRouter.get('/liveinvader', (req, res) => {
  res.render('liveinvader/liveinvader.ejs', { title: 'RTC 채팅 구현' });
});

export default liveRouter;
