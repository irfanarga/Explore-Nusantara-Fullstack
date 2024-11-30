const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventReviewSchema = new Schema({
  rating: Number,
  body: String
});

module.exports = mongoose.model('EventReview', eventReviewSchema);