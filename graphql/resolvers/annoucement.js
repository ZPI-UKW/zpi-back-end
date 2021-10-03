const Annoucement = require('../../models/annoucement');
const User = require('../../models/user');
const Category = require('../../models/category');
const { CustomError } = require('../../util/error');
const { clearImage } = require('../../util/file');
const Reservation = require('../../models/reservation');

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
    console.log('Test: ', annoucementInput);
    if (!isAuth && !userId) throw new CustomError('Not authorized', 401);

    const user = await User.findById(userId);
    if (!user) throw new CustomError('user not found', 404);

    const category = await Category.findById(annoucementInput.category);
    if (!category) throw new CustomError('category not found', 404);

    const annoucement = new Annoucement({
      title: annoucementInput.title,
      description: annoucementInput.description,
      location: annoucementInput.location,
      phone: annoucementInput.phone,
      email: annoucementInput.email,
      images: annoucementInput.images,
      costs: annoucementInput.costs,
      categoryId: category,
      addedBy: userId,
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
    if (!isAuth && !userId) throw new CustomError('Not authorized', 401);

    const user = await User.findById(userId);
    if (!user) throw new CustomError('user not found', 404);

    const annoucement = await Annoucement.findById(annoucementInput.id);
    if (!annoucement) throw new CustomError('annoucement not found');
    if (annoucement.addedBy.toString() !== user._id.toString())
      throw new CustomError('you do not have permission', 401);

    if (annoucementInput.title) annoucement.title = annoucementInput.title;
    if (annoucementInput.description) annoucement.description = annoucementInput.description;
    if (annoucementInput.location) annoucement.location = annoucementInput.location;
    if (annoucementInput.phone) annoucement.phone = annoucementInput.phone;
    if (annoucementInput.email) annoucement.email = annoucementInput.email;
    if (annoucementInput.costs) annoucement.costs = annoucementInput.costs;
    if (annoucementInput.images && annoucement.images !== 'undefined') {
      annoucement.images.forEach((image) => {
        clearImage(image);
      });
      annoucement.images = annoucementInput.images;
    }

    const updatedAnnoucement = await annoucement.save();
    return {
      ...updatedAnnoucement._doc,
      id: updatedAnnoucement._id.toString(),
    };
  } catch (e) {
    throw new Error(e.message || 'Unknown error occured');
  }
};

const deleteAnnoucement = async ({ annoucementId }, { isAuth, userId }) => {
  try {
    if (!isAuth && !userId) throw new CustomError('Not authorized', 401);

    const user = await User.findById(userId);
    if (!user) throw new CustomError('user not found', 404);

    const annoucement = await Annoucement.findById(annoucementId);
    if (!annoucement) throw new CustomError('annoucement not found', 404);
    if (annoucement.addedBy.toString() !== user._id.toString())
      throw new CustomError('you do not have permission to perform this action', 401);

    annoucement.images.forEach((image) => {
      clearImage(image);
    });

    await Reservation.deleteMany({
      annoucementId: annoucement
    })

    Annoucement.deleteOne(annoucement)

    return 'annoucement deleted sucessfully'
  } catch (e) {
    throw new Error(e.message || 'Unknown error occured');
  }
};

const getAnnoucements = async ({ addedBy, categoryId, search, reservedBy }) => {
  try {
    if (!addedBy && !categoryId && !search && !reservedBy)
      throw new CustomError('Specify addedBy, categoryId, search or reservedBy.');

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
    else if (reservedBy) {
      const reservation = await Reservation.find({ reservedBy }).populate('annoucementId');
      if (!reservation) throw new CustomError('Reservation not found', 404);

      annoucements = reservation.map((el) => ({
        ...el._doc.annoucementId._doc,
        id: el._doc.annoucementId._id,
      }));
    }

    if (!annoucements) throw new CustomError('Annoucement not found', 404);

    let mappedAnn;
    if (!reservedBy) {
      mappedAnn = annoucements.map((el) => ({ ...el._doc, id: el._id.toString() }));
      return mappedAnn;
    }

    return annoucements;
  } catch (e) {
    throw e;
  }
};

const getAnnoucement = async ({ id }) => {
  try {
    const annoucement = await Annoucement.findById(id).populate('categoryId').populate('addedBy');
    if (!annoucement) throw new CustomError('Annoucement not found', 404);

    return {
      ...annoucement._doc,
      id: annoucement._doc._id,
      addedBy: { ...annoucement._doc.addedBy._doc, phonenumber: annoucement._doc.addedBy.phone },
    };
  } catch (e) {
    throw e;
  }
};

module.exports = {
  annoucement,
  createAnnoucement,
  editAnnoucement,
  deleteAnnoucement,
  getAnnoucements,
  getAnnoucement,
};
