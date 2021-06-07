const { reservationData } = require('./util');
const { UserWithId } = require('./user');

module.exports = {
  Reservation: `
    type Reservation {
      ${reservationData}
    }`,

  ReservationInputData: `
    input ReservationInputData {
        startAt: String!
        endAt: String!
        annoucementId: ID!
    }
  `
};
