const main = {
  view: (req, res) => {
    // res.send('Hello World');
    console.log(req.cookies);

    res.render('main', { title: 'HelloWorld', isLoggedIn: req.isLogged });
  },
};

export default main;
