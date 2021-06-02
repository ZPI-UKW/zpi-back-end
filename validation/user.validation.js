const validator = require('validator');

const changeUserDateValidation = ({ email, name, lastname, phonenumber }) => {
  const errors = [];
  if (!validator.isEmail(email)) errors.push({ message: 'Invalid email' });
  if (validator.isEmpty(name)) errors.push({ message: 'Name cannot be empty' });
  if (validator.isEmpty(lastname)) errors.push({ message: 'Lastname cannot be empty' });
  if (
    !validator.isInt(phonenumber) ||
    validator.isEmpty(phonenumber) ||
    !validator.isLength(phonenumber, { min: 9, max: 9 })
  )
    errors.push({ message: 'Invalid phone number' });

  return errors;
};

const changePasswordValidation = ({ newPassword }) => {
  const errors = [];
  if (validator.isEmpty(newPassword) || !validator.isLength(newPassword, { min: 8 }))
    errors.push({ message: 'Invalid password' });

  return errors;
};

module.exports = {
  changeUserDateValidation,
  changePasswordValidation,
};
