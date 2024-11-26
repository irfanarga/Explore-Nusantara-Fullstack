const Destination = require('../models/destination');

module.exports.isAuthorDestination = async (req, res, next) => {
  const { id } = req.params;
  let destination = await Destination.findById(id);

  if (!destination.author.equals(req.user._id)) {
    req.flash('error_msg', 'You are not authorized!');
    return res.redirect(`/destinations`);
  }

  next();
}