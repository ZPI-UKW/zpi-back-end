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
};

// addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
