const Category = require('../../models/category');
const { CustomError } = require('../../util/error');

const category = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (e) {
    throw e;
  }
};

const getCategory = async ({ id }) => {
  try {
    const category = await Category.findOne({ _id: id });
    if (!category) throw new CustomError('Category does not exist', 404);
    return category;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  category,
  getCategory,
};
