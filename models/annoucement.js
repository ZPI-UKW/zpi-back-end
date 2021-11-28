const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const annoucementSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    condition: { type: String, required: true },
    costs: {
      day: { type: Number, required: true },
      week: { type: Number, required: true },
      month: { type: Number, required: true },
    },
    images: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Annoucement', annoucementSchema);
