const main = {
  /* local 구현시 */
  view: (req, res) => {
    // res.send('Hello World');

    res.render('main', {
      title: 'HelloWorld',
      isLoggedIn: req.session.isLogined,
    });
  },

  view2: (req, res) => {
    res.render('home', {
      title: 'RealWorld',
      isLoggedIn: req.user,
    });
  },
};

export default main;
