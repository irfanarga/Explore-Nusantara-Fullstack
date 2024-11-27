const Review = require('../models/review');
const Destination = require('../models/destination');

module.exports.store = async (req, res) => {
  const review = new Review(req.body.review);
  const destination = await Destination.findById(req.params.destination_id);
  destination.reviews.push(review);
  await review.save();
  await destination.save();
  req.flash('success_msg', 'Successfully add review!');
  res.redirect(`/destinations/${req.params.destination_id}`);
}

module.exports.destroy = async (req, res) => {
  const { destination_id, review_id } = req.params;
  await Destination.findByIdAndUpdate(destination_id, { $pull: { reviews: review_id } });
  await Review.findByIdAndDelete(review_id);
  req.flash('success_msg', 'Successfully delete review!');
  res.redirect(`/destinations/${destination_id}`);
}