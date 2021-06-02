const { buildSchema } = require('graphql');
const { User, UserInputData, UserInputWithId, UserWithId } = require('./user');
const { Category } = require('./category');
const { Annoucement, AnnoucementData, AnnoucementInputData } = require('./annoucement');


module.exports = buildSchema(`
    ${User}
    ${UserWithId}
    ${UserInputData}
    ${UserInputWithId}
    ${Category}
    ${Annoucement}
    ${AnnoucementData}
    ${AnnoucementInputData}

    type Id {
        _id: ID!
    }

    type RootQuery {
        login(email: String!, password: String!): UserWithId!
        getUserData: UserWithId!
        category: [Category!]!
        getCategory(id: ID): Category!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createAnnoucement(annoucementInput: AnnoucementInputData): Annoucement!
        changeUserData(userInput: UserInputWithId): UserWithId!
        changePassword(currentPassword: String!, newPassword: String!): Id!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
