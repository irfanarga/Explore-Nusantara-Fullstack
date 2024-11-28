const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const localpreneurReviewSchema = new Schema({
  rating: Number,
  body: String
});

module.exports = mongoose.model('LocalpreneurReview', localpreneurReviewSchema);