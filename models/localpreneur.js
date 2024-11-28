const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const localpreneurReview = require('./localpreneurReview');

const localpreneurSchema = new Schema({
  name: String,
  location: String,
  description: String,
  city: String,
  images: [
    {
      url: String,
      filename: String
    }
  ],
  phone: String,
  price: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'localpreneurReview'
    }
  ]
});

localpreneurSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await localpreneurReview.deleteMany({ _id: { $in: doc.reviews } })
  }
})

module.exports = mongoose.model('Localpreneur', localpreneurSchema);