const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { CustomError } = require('../../util/error');
const { CONFIG } = require("../../config/config");

//registration
const createUser = async ({ userInput }) => {
  const errors = [];
  if (!validator.isEmail(userInput.email)) {
    errors.push({ message: 'Invalid email' });
  }
  if (
    validator.isEmpty(userInput.password) ||
    !validator.isLength(userInput.password, { min: 8 })
  ) {
    errors.push({ message: 'Password too short' });
  }

  if (errors.length > 0) throw new CustomError('invalid inputs', 400);

  const existingUser = await User.findOne({ email: userInput.email });
  if (existingUser) throw new CustomError('user exists', 422);

  const password = await bcrypt.hash(userInput.password, 12);
  const user = new User({
    email: userInput.email,
    password: password,
    name: userInput.name,
    lastname: userInput.lastname,
    phone: userInput.phonenumber,
  });
  const createUser = await user.save();
  return { ...createUser._doc, phonenumber: createUser.phone, _id: createUser._id.toString() };
};

//login
const login = async ({ email, password }, { res }) => {
  const user = await User.findOne({ email: email });
  if (!user) throw new CustomError('User not found', 401);
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) throw new CustomError('User not found', 401);

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
    }, CONFIG.JWT_SECRET,
    {
      expiresIn: '6h',
    },
  );

  res.cookie('jid', token, { httpOnly: true, sameSite: 'none', secure: true });

  return {
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
    lastname: user.lastname,
    phonenumber: user.phone,
  };
};

//logout
const logout = async (_, { isAuth, userId, res, cookies }) => {
  try {
    if (!isAuth && !userId) throw new CustomError('Not authorized', 401);

    res.cookie('jid', cookies.jid, { httpOnly: true, maxAge: 0 });

    return true;
  } catch (e) {
    throw e;
  }
};

//fetching user data when he is logged in
const getUserData = async (_, { isAuth, userId }) => {
  if (!isAuth && !userId) {
    const error = new Error('Not authorized');
    error.code = 401;
    throw error;
  }

  const user = await User.findOne({ _id: userId });
  if (!user) {
    const error = new Error('User not found');
    error.code = 401;
    throw error;
  }

  return {
    _id: userId,
    email: user.email,
    name: user.name,
    lastname: user.lastname,
    phonenumber: user.phone,
  };
};

module.exports = {
  createUser,
  login,
  getUserData,
  logout,
};
