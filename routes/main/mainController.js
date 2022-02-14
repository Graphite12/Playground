const main = {
  view: (req, res) => {
    // res.send('Hello World');
    res.render('main', { title: 'HelloWorld' });
  },
};

export default main;
