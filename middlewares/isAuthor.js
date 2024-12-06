const Destination = require('../models/destination');
const Localpreneur = require('../models/localpreneur');
const Event = require('../models/event');
const Review = require('../models/review');
const LocalpreneurReview = require('../models/localpreneurReview');
const EventReview = require('../models/eventReview');

module.exports.isAuthorDestination = async (req, res, next) => {
  const { id } = req.params;
  let destination = await Destination.findById(id);

  if (!destination.author.equals(req.user._id)) {
    req.flash('error_msg', 'You are not authorized!');
    return res.redirect(`/destinations`);
  }

  next();
}

module.exports.isAuthorReviewDestination = async (req, res, next) => {
  const { destination_id, review_id } = req.params;
  let review = await Review.findById(review_id);

  if (!review.author.equals(req.user._id)) {
    req.flash('error_msg', 'You are not authorized!');
    return res.redirect(`/destinations/${destination_id}`);
  }

  next();
}

module.exports.isAuthorLocalpreneur = async (req, res, next) => {
  const { id } = req.params;
  let localpreneur = await Localpreneur.findById(id);

  if (!localpreneur.author.equals(req.user._id)) {
    req.flash('error_msg', 'You are not authorized!');
    return res.redirect(`/localpreneurs`);
  }

  next();
}

module.exports.isAuthorReviewLocalpreneur = async (req, res, next) => {
  const { localpreneur_id, localpreneurReview_id } = req.params;
  let review = await LocalpreneurReview.findById(localpreneurReview_id);

  if (!review.author.equals(req.user._id)) {
    req.flash('error_msg', 'You are not authorized!');
    return res.redirect(`/localpreneurs/${localpreneur_id}`);
  }

  next();
}

module.exports.isAuthorEvent = async (req, res, next) => {
  const { id } = req.params;
  let event = await Event.findById(id);

  if (!event.author.equals(req.user._id)) {
    req.flash('error_msg', 'You are not authorized!');
    return res.redirect(`/events`);
  }

  next();
}

module.exports.isAuthorReviewEvent = async (req, res, next) => {
  const { event_id, eventReview_id } = req.params;
  let review = await EventReview.findById(eventReview_id);

  if (!review.author.equals(req.user._id)) {
    req.flash('error_msg', 'You are not authorized!');
    return res.redirect(`/events/${event_id}`);
  }

  next();
}