const { createUser, login, getUserData, logout } = require('./auth');
const { category, getCategory } = require('./category');
const { annoucement, createAnnoucement, getAnnoucements } = require('./annoucement');
const { changeUserData, changePassword } = require('./user');

module.exports = {
  createUser,
  login,
  getUserData,
  logout,
  category,
  getCategory,
  annoucement,
  getAnnoucements,
  createAnnoucement,
  changeUserData,
  changePassword,
};
