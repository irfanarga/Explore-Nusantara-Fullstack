const Destination = require('../models/destination');
const Localpreneur = require('../models/localpreneur');
const Event = require('../models/event');

module.exports.isAuthorDestination = async (req, res, next) => {
  const { id } = req.params;
  let destination = await Destination.findById(id);

  if (!destination.author.equals(req.user._id) && req.user.role !== 'admin') {
    req.flash('error_msg', 'You are not authorized!');
    return res.redirect(`/destinations`);
  }

  next();
}

module.exports.isAuthorLocalpreneur = async (req, res, next) => {
  const { id } = req.params;
  let localpreneur = await Localpreneur.findById(id);

  if (!localpreneur.author.equals(req.user._id) && req.user.role !== 'admin') {
    req.flash('error_msg', 'You are not authorized!');
    return res.redirect(`/localpreneurs`);
  }

  next();
}

module.exports.isAuthorEvent = async (req, res, next) => {
  const { id } = req.params;
  let event = await Event.findById(id);

  if (!event.author.equals(req.user._id) && req.user.role !== 'admin') {
    req.flash('error_msg', 'You are not authorized!');
    return res.redirect(`/events`);
  }

  next();
}