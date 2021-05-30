const User = require('../../models/user');
const _ = require('lodash');
const { changeUserDateValidation } = require('../../validation/user.validation');
const { CustomError } = require('../../util/error');

const changeUserData = async (
  { userInput: { email, name, lastname, phonenumber } },
  { isAuth, userId, next },
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
    user.phonenumber = phonenumber;

    const updatedUser = await user.save();

    return {
      ..._.omit(updatedUser._doc, ['password', 'phone']),
      phonenumber: updatedUser._doc.phone,
    };
  } catch (e) {
    throw e;
  }
};

module.exports = {
  changeUserData,
};
