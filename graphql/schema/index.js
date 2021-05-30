const { buildSchema } = require('graphql');
const {
  User,
  AuthUser,
  UserInputData,
  ChangeUserInputData,
  ChangeUserReturnData,
} = require('./user');
const { Category } = require('./category');

module.exports = buildSchema(`
    ${User}
    ${AuthUser}
    ${UserInputData}
    ${ChangeUserInputData}
    ${Category}
    ${ChangeUserReturnData}

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        getUserData: AuthData!
        category: [Category!]!
        getCategory(id: ID): Category!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        changeUserData(userInput: ChangeUserInputData): ChangeUserReturnData!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
