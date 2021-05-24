const { buildSchema } = require('graphql');
const { User, AuthUser, UserInputData } = require('./user');
const { Category } = require('./category');

module.exports = buildSchema(`
    ${User}
    ${AuthUser}
    ${UserInputData}
    ${Category}

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        getUserData: AuthData!
        category: [Category!]!
        getCategory(id: ID): Category!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
