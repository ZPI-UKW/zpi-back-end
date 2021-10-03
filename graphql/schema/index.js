const { buildSchema } = require('graphql');
const { User, UserInputData, UserInputWithId, UserWithId } = require('./user');
const { Category } = require('./category');
const { Reservation, ReservationInputData } = require('./reservation');
const {
  Costs,
  Annoucement,
  AnnoucementData,
  AnnoucementInputData,
  SingleAnnoucement,
} = require('./annoucement');

module.exports = buildSchema(`
    ${User}
    ${UserWithId}
    ${UserInputData}
    ${UserInputWithId}
    ${Category}
    ${Costs}
    ${Annoucement}
    ${SingleAnnoucement}
    ${AnnoucementData}
    ${AnnoucementInputData}
    ${Reservation}
    ${ReservationInputData}

    type Id {
        _id: ID!
    }

    type RootQuery {
        login(email: String!, password: String!): UserWithId!
        getUserData: UserWithId!
        category: [Category!]!
        getCategory(id: ID, englishName: String): Category!
        getAnnoucement(id: String!): SingleAnnoucement!
        getAnnoucements(addedBy: String, categoryId: String, search: String, reservedBy: String): [Annoucement!]!
        logout: Boolean
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createAnnoucement(annoucementInput: AnnoucementInputData): Annoucement!
        editAnnoucement(annoucementInput: AnnoucementEditInput): Annoucement!
        createReservation(reservationInput: ReservationInputData): Reservation!
        changeUserData(userInput: UserInputWithId): UserWithId!
        changePassword(currentPassword: String!, newPassword: String!): Id!
        deleteAnnoucement(annoucementId: ID!): String!
        cancelReservation(reservationId: ID!): String!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
