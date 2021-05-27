const { buildSchema } = require('graphql');
const { User, AuthUser, UserInputData } = require('./user');
const { Category } = require('./category');
const { Annoucement, AnnoucementData, AnnoucementInputData } = require('./annoucement');

module.exports = buildSchema(`
    ${User}
    ${AuthUser}
    ${UserInputData}
    ${Category}
    ${Annoucement}
    ${AnnoucementData}
    ${AnnoucementInputData}

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        getUserData: AuthData!
        category: [Category!]!
        annoucement: [AnnoucementData!]!
        getCategory(id: ID): Category!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createAnnoucement(annoucementInput: AnnoucementInputData): Annoucement!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
