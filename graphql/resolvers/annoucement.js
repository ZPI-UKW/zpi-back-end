const Annoucement = require('../../models/annoucement');
const User = require('../../models/user');
const Category = require('../../models/category');

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

const createAnnoucement = async ({ annoucementInput }) => {
  try {
    const user = await User.findOne()
    if(!user) {
        const error = new Error('Invalid user')
        error.code = 401;
        throw error; 
    }

    const category = await Category.findById(annoucementInput.category)
    if(!category) {
        const error = new Error('Invalid user')
        error.code = 401;
        throw error; 
    }

    const annoucement = new Annoucement({
      title: annoucementInput.title,
      description: annoucementInput.description,
      location: annoucementInput.location,
      phone: annoucementInput.phone,
      email: annoucementInput.email,
      images: annoucementInput.images,
      costs: annoucementInput.costs,
      categoryId: category,
      addedBy: user
    });
    console.log(annoucement)
    const createAnnoucement = await annoucement.save();
    return { 
      ...createAnnoucement._doc, 
      id: createAnnoucement._id.toString()
    };
  } catch (e) {
    throw new Error(e.message || 'Unknown error occured');
  }
}

module.exports = {
  annoucement,
  createAnnoucement
};
