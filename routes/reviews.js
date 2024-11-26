const Review = require('../models/review');
const reviewSchema = require('../schemas/review');
const isValidObjectId = require('../middlewares/idValidObjectId');
const express = require('express');
const Destination = require('../models/destination');
const wrapAsync = require('../utils/wrapAsync');
const ErrorHandler = require('../utils/ErrorHandler');
const isAuth = require('../middlewares/isAuth');

const router = express.Router({mergeParams: true});

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    return next(new ErrorHandler(msg, 400));
  } else {
    next();
  }
}

router.post('/', isAuth, isValidObjectId('/destinations'), validateReview, wrapAsync(async (req, res) => {
  const review = new Review(req.body.review);
  const destination = await Destination.findById(req.params.destination_id);
  destination.reviews.push(review);
  await review.save();
  await destination.save();
  req.flash('success_msg', 'Successfully add review!');
  res.redirect(`/destinations/${req.params.destination_id}`);
}))

router.delete('/:review_id', isAuth, isValidObjectId('/destinations'), wrapAsync(async (req, res) => {
  const { destination_id, review_id } = req.params;
  await Destination.findByIdAndUpdate(destination_id, { $pull: { reviews: review_id } });
  await Review.findByIdAndDelete(review_id);
  req.flash('success_msg', 'Successfully delete review!');
  res.redirect(`/destinations/${destination_id}`);
}))

module.exports = router;