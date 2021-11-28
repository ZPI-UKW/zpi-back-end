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
      categoryId: ID!
      addedBy: ID!
      status: String
      reservationId: ID
      startAt: String
      endAt: String
    }`,

  SingleAnnoucement: `  
    type SingleAnnoucement {
      ${annoucementData}
      categoryId: Category!
      addedBy: UserWithId!
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
        condition: String!
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
      condition: String!
      costs: costsInput
    }`,
};
