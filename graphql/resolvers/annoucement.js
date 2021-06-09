const Annoucement = require('../../models/annoucement');
const User = require('../../models/user');
const Category = require('../../models/category');
const { CustomError } = require('../../util/error');

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

const createAnnoucement = async ({ annoucementInput }, { isAuth, userId }) => {
  try {
    if (!isAuth && !userId) {
      const error = new Error('Not authorized');
      error.code = 401;
      throw error;
    }

    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('Invalid user');
      error.code = 401;
      throw error;
    }

    const category = await Category.findById(annoucementInput.category);
    if (!category) {
      const error = new Error('Invalid category');
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
      addedBy: user,
    });
    const createAnnoucement = await annoucement.save();
    return {
      ...createAnnoucement._doc,
      id: createAnnoucement._id.toString(),
    };
  } catch (e) {
    throw new Error(e.message || 'Unknown error occured');
  }
};

const editAnnoucement = async ({ annoucementInput }, { isAuth, userId }) => {
  try {
    if (!isAuth && !userId) {
      const error = new Error('Not authorized');
      error.code = 401;
      throw error;
    }

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('Invalid user');
      error.code = 401;
      throw error;
    }

    const category = await Category.findById(annoucementInput.category);
    if (!category) {
      const error = new Error('Invalid category');
      error.code = 401;
      throw error;
    }

    const annoucement = await Annoucement.findById(annoucementId).populate('addedBy')
    if(!annoucement) throw new CustomError('annoucement not found');
    if(annoucement.addedBy._id.toString() !== userId.toString()) throw new CustomError('you do not have permission');

    annoucement.title = annoucementInput.title
    annoucement.description = annoucementInput.description
    annoucement.location = annoucementInput.location
    annoucement.phone = annoucementInput.phone
    annoucement.email = annoucementInput.email
    annoucement.costs = annoucementInput.costs
    if(annoucementInput.images !== 'undefined') 
      annoucement.images = annoucementInput.images

    const updatedAnnoucement = await annoucement.save();
    return {
      ...updatedAnnoucement._doc,
      id: updatedAnnoucement._id.toString(),
    };
  } catch (e) {
    throw new Error(e.message || 'Unknown error occured');
  }
};

const getAnnoucements = async ({ addedBy, categoryId, search }) => {
  try {
    if (!addedBy && !categoryId && !search)
      throw new CustomError('Specify addedBy, categoryId or search');

    console.log(addedBy);
    let annoucements;
    if (addedBy) {
      const user = await User.findById(addedBy);
      if (!user) throw new CustomError('Invalid user', 401);

      annoucements = await Annoucement.find({ addedBy });
    } else if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) throw new CustomError('Invalid category', 401);

      annoucements = await Annoucement.find({ categoryId });
    } else if (search) annoucements = await Annoucement.find({ title: new RegExp(search) });

    if (!annoucements) throw new CustomError('Annoucement not found', 404);

    const mappedAnn = annoucements.map((el) => ({ ...el._doc, id: el._id.toString() }));

    return mappedAnn;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  annoucement,
  createAnnoucement,
  getAnnoucements,
};
