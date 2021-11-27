const { createUser, login, getUserData, logout } = require('./auth');
const { category, getCategory } = require('./category');
const { createReservation, cancelReservation } = require('./reservation');
const { annoucement, createAnnoucement, getAnnoucement, editAnnoucement, getAnnoucements, deleteAnnoucement, getUserReservedAnnoucements } = require('./annoucement');
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
  getAnnoucement,
  createAnnoucement,
  editAnnoucement,
  createReservation,
  changeUserData,
  changePassword,
  cancelReservation,
  deleteAnnoucement,
  getUserReservedAnnoucements
};
