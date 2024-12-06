const EventReview = require('../models/eventReview');
const Event = require('../models/event');

module.exports.index = async (req, res) => {
  const eventReviews = await EventReview.find();
  res.render('events/index', { eventReviews });
  // res.status(200).json({message: 'success', data: { eventReviews }});
}

module.exports.store = async (req, res) => {
  const { event_id } = req.params;
  const eventReview = new EventReview(req.body.eventReview);
  eventReview.author = req.user._id;
  await eventReview.save();
  const event = await Event.findById(event_id);
  event.reviews.push(eventReview);
  await event.save();
  req.flash('success_msg', 'Successfully add Event Review!');
  res.redirect(`/events/${event_id}`);
  // res.send({message: 'success', data: { eventReview }});
}

module.exports.destroy = async (req, res) => {
  const { event_id, eventReview_id } = req.params;
  await Event.findByIdAndUpdate(event_id, { $pull: { reviews: eventReview_id } });
  await EventReview.findByIdAndDelete(eventReview_id);
  req.flash('success_msg', 'Successfully delete Event Review!');
  res.redirect(`/events/${event_id}`);
  // res.send({message: 'success'});
}