const { createUser, login, getUserData } = require('./auth');
const { category, getCategory } = require('./category');

module.exports = {
  createUser,
  login,
  getUserData,
  category,
  getCategory,
};
