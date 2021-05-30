const User = require('../../models/user');
const _ = require('lodash');

const changeUserData = async (
  { userInput: { email, name, lastname, phonenumber } },
  { isAuth, userId },
) => {
  try {
    if (!isAuth && !userId) {
      const error = new Error('Not authorized');
      error.code = 401;
      throw error;
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }

    if (user.email !== email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        const error = new Error('Email exists');
        error.code = 409;
        throw error;
      }

      user.email = email;
    }

    user.name = name;
    user.lastname = lastname;
    user.phonenumber = phonenumber;

    const updatedUser = await user.save();

    return {
      ..._.omit(updatedUser._doc, ['password', 'phone']),
      phonenumber: updatedUser._doc.phone,
    };
  } catch (e) {
    const error = new Error(e.message || 'Unknown error occured');
    error.code = e.code || 500;
    throw error;
  }
};

module.exports = {
  changeUserData,
};
