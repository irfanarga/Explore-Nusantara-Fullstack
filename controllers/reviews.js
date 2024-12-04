const Review = require('../models/review');
const Destination = require('../models/destination');

module.exports.index = async (req, res) => {
  const reviews = await Review.find();
  res.render('destinations/index', { reviews });
  // res.status(200).json({message: 'success', data: { reviews }});
}

module.exports.store = async (req, res) => {
  const review = new Review(req.body.review);
  const destination = await Destination.findById(req.params.destination_id);
  destination.reviews.push(review);
  await review.save();
  await destination.save();
  req.flash('success_msg', 'Successfully add review!');
  res.redirect(`/destinations/${req.params.destination_id}`);
  // res.send({message: 'success', data: { review }});
}

module.exports.destroy = async (req, res) => {
  const { destination_id, review_id } = req.params;
  await Destination.findByIdAndUpdate(destination_id, { $pull: { reviews: review_id } });
  await Review.findByIdAndDelete(review_id);
  req.flash('success_msg', 'Successfully delete review!');
  res.redirect(`/destinations/${destination_id}`);
  // res.send({message: 'success'});
}