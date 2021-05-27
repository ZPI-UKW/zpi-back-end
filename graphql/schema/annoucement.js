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

    ${AddedBy}

    type AnnoucementData {          
      ${annoucementData}
        category: Category
        addedBy: AddedBy
    }`,

  AnnoucementInputData: `
    input costsInput {
      ${costsData}
    }

    input AnnoucementInputData {
        title: String
        description: String
        location: String
        phone: String
        email: String
        images: [String]
        costs: costsInput
        category: ID!
    }`
};

// addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
