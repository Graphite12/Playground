const checkAuthMiddleWare = async (req, res, next) => {
  if (!req.cookies.users) {
    return res.status(301).redirect('/users/signin');
  } else {
    req.isLogged = true;
    return next();
  }
};

export default checkAuthMiddleWare;
