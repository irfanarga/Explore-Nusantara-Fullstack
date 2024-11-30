const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventReview = require('./eventReview');

const eventSchema = new Schema({
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
      ref: 'EventReview'
    }
  ], 
  date: Date
});

eventSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await EventReview.deleteMany({ _id: { $in: doc.reviews } })
  }
})

module.exports = mongoose.model('Event', eventSchema);