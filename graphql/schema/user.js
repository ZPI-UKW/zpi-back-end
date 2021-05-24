const { userData } = require('./util');

module.exports = {
  User: `
    type User {
        _id: ID!
        password: String!
        ${userData}
    }
    `,
  AuthUser: `
    type AuthData {
        userId: ID!
        ${userData}
    }`,
  UserInputData: `
    input UserInputData {
        password: String!
        ${userData}
    }`,
  AddedBy: `
    type AddedBy {
        _id: ID!
        ${userData}
  }`,
};
