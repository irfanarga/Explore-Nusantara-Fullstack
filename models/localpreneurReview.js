const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const localpreneurReviewSchema = new Schema({
  rating: Number,
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('LocalpreneurReview', localpreneurReviewSchema);