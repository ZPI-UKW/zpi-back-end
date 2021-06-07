const { createUser, login, getUserData } = require('./auth');
const { category, getCategory } = require('./category');
const { annoucement, createAnnoucement } = require('./annoucement');
const { createReservation } = require('./reservation');
const { changeUserData, changePassword } = require('./user');

module.exports = {
  createUser,
  login,
  getUserData,
  category,
  getCategory,
  annoucement,
  createAnnoucement,
  createReservation,
  changeUserData,
  changePassword,
};
