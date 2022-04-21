const main = {
  view: (req, res) => {
    // res.send('Hello World');
    console.log(req.session);

    res.render('main', {
      title: 'HelloWorld',
      isLoggedIn: req.session.isLogined,
    });
  },
};

export default main;
