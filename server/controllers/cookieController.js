const cookieController = {};

cookieController.setUserCookie = (req, res, next) => {
  const { userId } = res.locals;
  res.cookie('userId', userId, { httpOnly : true });
  return next();
}

module.exports = cookieController;