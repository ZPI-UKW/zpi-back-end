const User = require('../../models/user');
const Reservation = require('../../models/reservation');
const Annoucement = require('../../models/annoucement');
const moment = require('moment');

const createReservation = async ({ reservationInput }, { isAuth, userId }) => {
  try {
    // if (!isAuth && !userId) {
    //   const error = new Error('Not authorized');
    //   error.code = 401;
    //   throw error;
    // }

    const user = await User.findOne();
    if(!user) {
        const error = new Error('Invalid user')
        error.code = 401;
        throw error; 
    }

    const annoucement = await Annoucement.findById(reservationInput.annoucementId)
    if(!annoucement) {
        const error = new Error('Invalid annoucement')
        error.code = 401;
        throw error; 
    }

    const startAt = moment(reservationInput.startAt)
    const endAt = moment(reservationInput.endAt)

    const reservations = await Reservation.find({
        annoucementId: annoucement
    })

    let notFree = false
    await reservations.forEach(res => {
        console.log("end: " + res.endAt)
        console.log("start: " + startAt.toISOString())
        notFree = true
        if(endAt < res.startAt || startAt > res.endAt) notFree = false
    })
    if(notFree) {
        const error = new Error('date already reserved')
        error.code = 400
        throw error
    }

    let days = endAt.diff(startAt, 'days')
    let weeks = 0
    let months = 0
    if (days > 30) {
        months = Math.floor(days / 30)
        days -= months * 30
    }
    if (days > 7) {
        weeks = Math.floor(days / 7)
        days -= weeks * 7 
    }
    let totalCost = annoucement.costs.day * days
    totalCost += weeks ? annoucement.costs.week * weeks : 0
    totalCost += months ? annoucement.costs.month * months : 0

    const reservation = new Reservation({
      startAt: startAt,
      endAt: endAt,
      reservedBy: user,
      annoucementId: annoucement,
      totalCost: totalCost,
      status: 'reserved'
    });
    const createReservation = await reservation.save();
    return { 
      id: createReservation._id.toString()
    };
  } catch (e) {
    throw new Error(e.message || 'Unknown error occured');
  }
}

module.exports = {
  createReservation
};
