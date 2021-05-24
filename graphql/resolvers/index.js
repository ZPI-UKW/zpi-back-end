const { createUser, login, getUserData } = require('./auth');
const { category } = require('./category');

module.exports = {
  createUser,
  login,
  getUserData,
  category,
};
