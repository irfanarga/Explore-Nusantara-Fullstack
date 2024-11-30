const EventReview = require('../models/eventReview');
const Event = require('../models/event');

module.exports.store = async (req, res) => {
  const eventReview = new EventReview(req.body.eventReview);
  const event = await Event.findById(req.params.event_id);
  event.reviews.push(eventReview);
  await eventReview.save();
  await event.save();
  req.flash('success_msg', 'Successfully add Event Review!');
  res.redirect(`/events/${req.params.event_id}`);
  // res.send({message: 'success', data: { eventReview }});
}

module.exports.destroy = async (req, res) => {
  const { event_id, eventReview_id } = req.params;
  await Event.findByIdAndUpdate(event_id, { $pull: { reviews: eventReview_id } });
  await EventReview.findByIdAndDelete(eventReview_id);
  req.flash('success_msg', 'Successfully delete Event Review!');
  res.redirect(`/events/${event_id}`);
}