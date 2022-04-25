export default {
  isNotLogined: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      const message = encodeURIComponent('로그인한 상태입니다.');
      res.redirect(`/?error=${message}`);
    }
  },
  isLogined: (req, res, next) => {
    if (req.isAuthenticated()) {
      // 미들웨어에 next() 콜백에 대한 return 을 작성하지않을 시
      // req요청이 두번가게됨
      return next();
    }
    res.redirect('/');
  },
};
