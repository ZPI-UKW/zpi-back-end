const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

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

  if (errors.length > 0) {
    const error = new Error('Invalid input');
    error.data = errors;
    error.code = 422;
    throw error;
  }

  const existingUser = await User.findOne({ email: userInput.email });
  if (existingUser) {
    const error = new Error('user exists');
    throw error;
  }
  const password = await bcrypt.hash(userInput.password, 12);
  const user = new User({
    email: userInput.email,
    password: password,
    name: userInput.name,
    lastname: userInput.lastname,
    phone: userInput.phone,
  });
  const createUser = await user.save();
  return { ...createUser._doc, _id: createUser._id.toString() };
};

//login
const login = async ({ email, password }, { res }) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error('User not found');
    error.code = 401;
    throw error;
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    const error = new Error('Password mismatch');
    error.code = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '6h',
    },
  );

  res.cookie('jid', token, { httpOnly: true });

  return {
    userId: user._id.toString(),
    email: user.email,
    name: user.name,
    lastname: user.lastname,
    phonenumber: user.phone,
  };
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
    userId: userId,
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
};