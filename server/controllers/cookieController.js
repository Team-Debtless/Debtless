const cookieController = {};

// generates a cookie to store id of new users and users logged in for frontend to reference
cookieController.setUserCookie = (req, res, next) => {
  const { userId } = res.locals;
  res.cookie('userId', userId, { httpOnly : true });
  return next();
}

module.exports = cookieController;