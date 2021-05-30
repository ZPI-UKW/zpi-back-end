const { createUser, login, getUserData } = require('./auth');
const { category, getCategory } = require('./category');
const { annoucement } = require('./annoucement');
const { changeUserData } = require('./user');

module.exports = {
  createUser,
  login,
  getUserData,
  category,
  getCategory,
  annoucement,
  changeUserData,
};
