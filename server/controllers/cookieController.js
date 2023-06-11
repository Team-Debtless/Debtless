const cookieController = {};

// generates a cookie to store id of new users and users logged in for frontend to reference
cookieController.setUserCookie = (req, res, next) => {
  const { user_id } = res.locals;
  res.cookie('user_id', user_id, { httpOnly : true });
  return next();
}

module.exports = cookieController;