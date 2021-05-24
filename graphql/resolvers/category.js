const Category = require('../../models/category');

const category = async () => {
  try {
    const categories = await Category.find();
    console.log(categories);
    return categories;
  } catch {
    throw new Error('Unknown error occured');
  }
};

module.exports = {
  category,
};
