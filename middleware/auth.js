const jwt = require('jsonwebtoken');
const { CONFIG } = require("../config/config");

module.exports = (req, res, next) => {
  const token = req.cookies.jid;
  if (!token) {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, CONFIG.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
};
