const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocalpreneurReview = require('./localpreneurReview');

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
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'LocalpreneurReview'
    }
  ]
});

localpreneurSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await LocalpreneurReview.deleteMany({ _id: { $in: doc.reviews } })
  }
})

module.exports = mongoose.model('Localpreneur', localpreneurSchema);