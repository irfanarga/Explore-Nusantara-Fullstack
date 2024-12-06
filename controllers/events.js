const Event = require('../models/event');
const fs = require('fs');
const ExpressError = require('../utils/ErrorHandler');

module.exports.index = async (req, res) => {
  const events = await Event.find();
  res.render('events/index', { events });
  // res.status(200).json({message: 'success', data: { events }});
}

module.exports.store = async (req, res, next) => {
  const images = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  const event = new Event(req.body.event);
  event.author = req.user._id;
  event.images = images;
  await event.save();
  req.flash('success_msg', 'Successfully add a new event!');
  res.redirect(`/events`);
  // res.status(200).json({message: 'success', data: { event }});
}

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author'
      }
    })
  .populate('author');
  res.render('events/show', { event });
  // res.status(200).json({message: 'success', data: { event }});
}

module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  res.render('events/edit', { event });
  // res.status(200).json({message: 'success', data: { event }});
}

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findByIdAndUpdate(id, { ...req.body.event })
  if (req.files && req.files.length > 0) {
    event.images.forEach(image => {
      fs.unlink(image.url, err => new ExpressError(err));
    })

    const images = req.files.map(file => ({
      url: file.path,
      filename: file.filename
    }))
    event.images = images;
    await event.save();
  }
  req.flash('success_msg', 'Successfully update event!');
  res.redirect(`/events/${id}`);
  // res.status(200).json({message: 'success', data: { event }});
}

module.exports.destroy = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (event.images.length > 0) {
    event.images.forEach(image => {
      fs.unlink(image.url, err => new ExpressError(err));
    })
  }

  await event.deleteOne();

  req.flash('success_msg', 'Successfully delete event!');
  res.redirect('/events');
  // res.status(200).json({message: 'success', data: { event }});
}

module.exports.destroyImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { images } = req.body;
    
    if (!images && images.length === 0) {
      req.flash('error_msg', 'Please select at least 1 image!');
      return res.redirect(`/events/${id}/edit`);
    }

    images.forEach(image => {
      fs.unlinkSync(image, err => new ExpressError(err));
    })

    await Event.findByIdAndUpdate(id, { $pull: { images: { url: { $in: images } } } });

    req.flash('success_msg', 'Successfully delete image!');
    res.redirect(`/events/${id}/edit`);

  } catch (error) {
    req.flash('error_msg', error.message);
    res.redirect(`/events/${id}/edit`);
  }
}