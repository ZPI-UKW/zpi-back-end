module.exports = {
  userData: `
    email: String!
    name: String!
    lastname: String!
    phonenumber: String!
  `,

  categoryData: `
    id: ID!
    name: String!
    englishName: String!
  `,

  annoucementData: `
    id: ID!
    title: String!
    description: String!
    location: String!
    phone: String!
    email: String!
    images: [String!]!
    costs: Costs!
  `,

  costsData: `
    day: Float!
    week: Float!
    month: Float!
  `,
};
