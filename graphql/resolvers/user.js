const bcrypt = require('bcryptjs');
const _ = require('lodash');
const User = require('../../models/user');
const {
  changeUserDateValidation,
  changePasswordValidation,
} = require('../../validation/user.validation');
const { CustomError } = require('../../util/error');

const changeUserData = async (
  { userInput: { email, name, lastname, phonenumber } },
  { isAuth, userId },
) => {
  try {
    if (!isAuth && !userId) throw new CustomError('Not authorized', 401);

    const user = await User.findOne({ _id: userId });
    if (!user) throw new CustomError('User not found', 404);

    if (user.email !== email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new CustomError('Email exists', 409);
      user.email = email;
    }

    const errors = changeUserDateValidation({ email, name, lastname, phonenumber });
    if (errors.length > 0) throw new CustomError('Validation failed', 422, errors);

    user.name = name;
    user.lastname = lastname;
    user.phone = phonenumber;

    const updatedUser = await user.save();

    return {
      ..._.omit(updatedUser._doc, ['password', 'phone']),
      phonenumber: updatedUser._doc.phone,
    };
  } catch (e) {
    throw e;
  }
};

const changePassword = async ({ currentPassword, newPassword }, { isAuth, userId }) => {
  try {
    if (!isAuth && !userId) throw new CustomError('Not authorized', 401);

    const user = await User.findOne({ _id: userId });
    if (!user) throw new CustomError('User not found', 404);

    const isEqual = await bcrypt.compare(currentPassword, user.password);
    if (!isEqual) throw new CustomError('Invalid password', 404);

    if (currentPassword === newPassword) throw new CustomError('Passwords cannot be the same', 422);

    const errors = changePasswordValidation({ newPassword });
    if (errors.length > 0) throw new CustomError('Validation failed', 422, errors);

    const newHashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = newHashedPassword;

    user.save();

    return {
      _id: userId,
    };
  } catch (e) {
    throw e;
  }
};

module.exports = {
  changeUserData,
  changePassword,
};
