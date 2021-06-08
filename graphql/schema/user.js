const { userData } = require('./util');

module.exports = {
  User: `
    type User {
        _id: ID!
        password: String!
        ${userData}
    }
    `,
  UserWithId: `
    type UserWithId {
      _id: ID!
      ${userData}
    }`,
  UserInputData: `
    input UserInputData {
        password: String!
        ${userData}
    }`,
  UserInputWithId: `
    input UserInputWithId {
       ${userData}
    }
  `,
};
