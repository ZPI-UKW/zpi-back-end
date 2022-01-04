const { reservationData } = require('./util');

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
  `,

  UserAnnReservations: `
    type UserAnnReservations {
      id: String!,
      agreement: String,
      startAt: String!
      endAt: String!
      annoucementId: Annoucement,
      status: String!
    }`,
};
