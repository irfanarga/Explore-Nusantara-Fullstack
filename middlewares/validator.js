const ErrorHandler = require('../utils/ErrorHandler');
const destinationSchema = require('../schemas/destination');
const reviewSchema = require('../schemas/review');
const localpreneurSchema = require('../schemas/localpreneur');
const localpreneurReviewSchema = require('../schemas/localpreneurReview');

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

module.exports.validateLocalpreneur = (req, res, next) => {
  const { error } = localpreneurSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    return next(new ErrorHandler(msg, 400));
  } else {
    next();
  }
}

module.exports.validateLocalpreneurReview = (req, res, next) => {
  const { error } = localpreneurReviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    return next(new ErrorHandler(msg, 400));
  } else {
    next();
  }
}