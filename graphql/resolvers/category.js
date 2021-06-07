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

const getCategory = async ({ id, englishName }) => {
  try {
    if (!id && !englishName) throw new CustomError('Specify id or englishName');

    let category;
    if (id) category = await Category.findById(id);
    else category = await Category.findOne({ englishName });

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
