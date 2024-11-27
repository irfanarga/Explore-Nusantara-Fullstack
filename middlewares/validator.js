const ErrorHandler = require('../utils/ErrorHandler');
const destinationSchema = require('../schemas/destination');
const reviewSchema = require('../schemas/review');

module.exports.validateDestination = (req, res, next) => {
  const { error } = destinationSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    return next(new ErrorHandler(msg, 400));
  } else {
    next();
  }
}

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    return next(new ErrorHandler(msg, 400));
  } else {
    next();
  }
}