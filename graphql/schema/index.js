const { buildSchema } = require('graphql');
const { User, AuthUser, UserInputData } = require('./user');

module.exports = buildSchema(`
    ${User}
    ${AuthUser}
    ${UserInputData}

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        getUserData: AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
