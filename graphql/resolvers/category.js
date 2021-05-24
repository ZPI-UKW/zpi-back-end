const Category = require('../../models/category');

const category = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (e) {
    throw new Error(e.message || 'Unknown error occured');
  }
};

const getCategory = async ({ id }) => {
  try {
    const category = await Category.findOne({ _id: id });
    if (!category) throw new Error('Category does not exist');
    return category;
  } catch (e) {
    throw new Error(e.message || 'Unknown error occured');
  }
};

module.exports = {
  category,
  getCategory,
};
