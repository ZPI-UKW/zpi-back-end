const { buildSchema } = require('graphql');
const { User, UserInputData, UserInputWithId, UserWithId } = require('./user');
const { Category } = require('./category');
const { Reservation, ReservationInputData } = require('./reservation')
const { Costs, Annoucement, AnnoucementData, AnnoucementInputData } = require('./annoucement');

module.exports = buildSchema(`
    ${User}
    ${UserWithId}
    ${UserInputData}
    ${UserInputWithId}
    ${Category}
    ${Costs}
    ${Annoucement}
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
        getAnnoucements(addedBy: String, categoryId: String, search: String): [Annoucement!]!
        logout: Boolean
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createAnnoucement(annoucementInput: AnnoucementInputData): Annoucement!
        createReservation(reservationInput: ReservationInputData): Reservation!
        changeUserData(userInput: UserInputWithId): UserWithId!
        changePassword(currentPassword: String!, newPassword: String!): Id!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
