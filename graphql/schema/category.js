const { categoryData } = require('./util');

module.exports = {
  Category: `
      type Category {
        ${categoryData}
      }`,
};
