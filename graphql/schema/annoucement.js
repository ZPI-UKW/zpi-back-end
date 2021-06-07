const { AddedBy } = require('./user');
const { annoucementData, costsData } = require('./util');

module.exports = {
  Annoucement: `  
    type Annoucement {
      ${annoucementData}
    }`,

  AnnoucementData: `
    type Costs {
      ${costsData}
    }

    type AnnoucementData {          
      ${annoucementData}
        category: Category
        addedBy: UserWithId
    }`,

  AnnoucementInputData: `
    input costsInput {
      ${costsData}
    }

    input AnnoucementInputData {
        title: String!
        description: String!
        location: String!
        phone: String!
        email: String!
        images: [String]
        costs: costsInput!
        category: ID!
    }`
};

// addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
