const { buildSchema } = require('graphql');
const { User, UserInputData, UserInputWithId, UserWithId } = require('./user');
const { Category } = require('./category');

module.exports = buildSchema(`
    ${User}
    ${UserWithId}
    ${UserInputData}
    ${UserInputWithId}
    ${Category}

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
        changeUserData(userInput: UserInputWithId): UserWithId!
        changePassword(currentPassword: String!, newPassword: String!): Id!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
