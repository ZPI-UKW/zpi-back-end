const User = require('../../models/user');
const Reservation = require('../../models/reservation');
const Annoucement = require('../../models/annoucement');
const moment = require('moment-timezone');
const { CustomError } = require('../../util/error');

const createReservation = async ({ reservationInput }, { isAuth, userId }) => {
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

    const annoucement = await Annoucement.findById(reservationInput.annoucementId);
    if (!annoucement) {
      const error = new Error('Invalid annoucement');
      error.code = 401;
      throw error;
    }

    const startAt = moment.utc(reservationInput.startAt);
    const endAt = moment.utc(reservationInput.endAt);

    const reservations = await Reservation.find({
      annoucementId: annoucement,
    });

    let notFree = false;
    await reservations.forEach((res) => {
      notFree = true;
      if (endAt < moment.utc(res.startAt) || startAt > moment.utc(res.endAt)) notFree = false;
    });
    if (notFree) throw new CustomError('date already exist', 409);

    let days = endAt.diff(startAt, 'days');
    let weeks = 0;
    let months = 0;
    if (days > 30) {
      months = Math.floor(days / 30);
      days -= months * 30;
    }
    if (days > 7) {
      weeks = Math.floor(days / 7);
      days -= weeks * 7;
    }
    let totalCost = annoucement.costs.day * days;
    totalCost += weeks ? annoucement.costs.week * weeks : 0;
    totalCost += months ? annoucement.costs.month * months : 0;

    const reservation = new Reservation({
      startAt: startAt,
      endAt: endAt,
      reservedBy: user,
      annoucementId: annoucement,
      totalCost: totalCost,
      status: 'reserved',
    });
    const createReservation = await reservation.save();
    return {
      id: createReservation._id.toString(),
    };
  } catch (e) {
    throw e;
  }
};

const releaseDamage = async ({damageInput}, { isAuth, userId }) => {
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
    
    const reservation = await Reservation.findById(damageInput.reservationId);
    if (!reservation) {
      const error = new Error('Invalid reservation id');
      error.code = 401;
      throw error;
    }

    const annoucement = await Annoucement.findById(reservation.annoucementId);
    if (!annoucement) {
      const error = new Error('Invalid annoucement id');
      error.code = 401;
      throw error;
    }
    
    if(annoucement.addedBy.toString() !== user._id.toString()) {
      const error = new Error('You do not have permission to do this action');
      error.code = 401;
      throw error;
    }

    reservation.releaseDamage.list = damageInput.list
    reservation.releaseDamage.approved = false
    reservation.status = 'waiting for release damage approve'
    const updatedReservation = await reservation.save()

    return 'Reservation release damage successfully updated'
  } catch (e) {
    throw e;
  }
}

const acceptReleaseDamage = async ({reservationId}, { isAuth, userId }) => {
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
    
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      const error = new Error('Invalid reservation id');
      error.code = 401;
      throw error;
    }
    
    if(reservation.reservedBy.toString() !== user._id.toString()) {
      const error = new Error('You do not have permission to do this action');
      error.code = 401;
      throw error;
    }

    reservations.releaseDamage.approved = true
    reservation.status = 'on loan'
    const updatedReservation = await reservation.save()

    return 'Reservation release damage successfully approved'
  } catch (e) {
    throw e;
  }
}

const returnDamage = async ({damageInput}, { isAuth, userId }) => {
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
    
    const reservation = await Reservation.findById(damageInput.reservationId);
    if (!reservation) {
      const error = new Error('Invalid reservation id');
      error.code = 401;
      throw error;
    }

    const annoucement = await Annoucement.findById(reservation.annoucementId);
    if (!annoucement) {
      const error = new Error('Invalid annoucement id');
      error.code = 401;
      throw error;
    }
    
    if(annoucement.addedBy.toString() !== user._id.toString()) {
      const error = new Error('You do not have permission to do this action');
      error.code = 401;
      throw error;
    }

    reservation.returnDamage.list = damageInput.list
    reservation.returnDamage.approved = false
    reservation.status = 'waiting for return damage approve'
    const updatedReservation = await reservation.save()

    return 'Reservation release damage successfully updated'
  } catch (e) {
    throw e;
  }
}

const acceptReturnDamage = async ({reservationId}, { isAuth, userId }) => {
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
    
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      const error = new Error('Invalid reservation id');
      error.code = 401;
      throw error;
    }
    
    if(reservation.reservedBy.toString() !== user._id.toString()) {
      const error = new Error('You do not have permission to do this action');
      error.code = 401;
      throw error;
    }

    reservations.returnDamage.approved = true
    reservation.status = 'finished'
    const updatedReservation = await reservation.save()

    return 'Reservation release damage successfully approved'
  } catch (e) {
    throw e;
  }
}

const cancelReservation = async ({reservationId}, { isAuth, userId }) => {
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
    
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      const error = new Error('Invalid reservation id');
      error.code = 401;
      throw error;
    }
    
    if(reservation.reservedBy.toString() !== user._id.toString()) {
      const error = new Error('You do not have permission to do this action');
      error.code = 401;
      throw error;
    }

    Reservation.findById(reservationId).remove().exec();
    return 'Reservation canceled successfully'
  } catch (e) {
    throw e;
  }
}

module.exports = {
  createReservation,
  cancelReservation
};
