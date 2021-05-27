const Annoucement = require('../../models/annoucement');

const annoucement = async () => {
  try {
    const annoucements = await Annoucement.find()
      .populate('categoryId')
      .populate('addedBy', '-password')
      .limit(20);

    return annoucements.map((ann) => {
      return {
        ...ann._doc,
        category: ann._doc.categoryId,
      };
    });
  } catch (e) {
    throw new Error(e.message || 'Unknown error occured');
  }
};

module.exports = {
  annoucement,
};
