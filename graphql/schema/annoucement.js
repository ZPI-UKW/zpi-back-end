const { annoucementData, costsData } = require('./util');

module.exports = {
  Costs: `
    type Costs {
      ${costsData}
    }
  `,
  Annoucement: `  
    type Annoucement {
      ${annoucementData}
    }`,

  AnnoucementData: `
    type AnnoucementData {          
      ${annoucementData}
        category: Category
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
    }
    
    input AnnoucementEditInput {
      id: ID!
      title: String
      description: String
      location: String
      phone: String
      email: String
      images: [String]
      costs: costsInput
    }`,
};

// addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
