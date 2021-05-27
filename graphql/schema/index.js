const { buildSchema } = require('graphql');
const { User, AuthUser, UserInputData } = require('./user');
const { Category } = require('./category');
const { Annoucement, AnnoucementData } = require('./annoucement');

module.exports = buildSchema(`
    ${User}
    ${AuthUser}
    ${UserInputData}
    ${Category}
    ${Annoucement}
    ${AnnoucementData}

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        getUserData: AuthData!
        category: [Category!]!
        annoucement: [AnnoucementData!]!
        getCategory(id: ID): Category!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createAnnoucement(annoucementData: AnnoucementInputData): Annoucement!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
