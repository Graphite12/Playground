const checkAuthToken = async (req, res, next) => {};

const isLogin = async (req, res, next) => {
  if (req.cookies.user) {
    req.isLogged = true;
  } else {
    req.isLogged = false;
  }
  next();
};

const isNotLogin = async (req, res, next) => {
  if (!req.cookies.user) {
    return res.redirect('/users/signin');
  }
  next();
};

export default { isLogin, isNotLogin, checkAuthToken };
