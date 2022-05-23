const main = {
  /* local 구현시 */
  view: (req, res) => {
    // res.send('Hello World');
    console.log('ip1', req.socket.remoteAddress);
    console.log('ip', req.headers['x-forwarded-for']);
    res.render('home', {
      title: 'HelloWorld',
      userdata: req.session.userdata,
    });
  },

  view2: (req, res) => {
    res.render('home', {
      title: 'RealWorld',
      userdata: req.user,
    });
  },

  error: (req, res) => {
    // res.send('Hello World');

    let user = req.session.userdata;

    if (user === undefined) {
      res.render('layout/error/error', {
        msg: '세션이 만료되었습니다.',
      });
    }
  },
};

export default main;
