const Destination = require('../models/destination');
const fs = require('fs');
const ExpressError = require('../utils/ErrorHandler');

module.exports.index = async (req, res) => {
  const destinations = await Destination.find();
  // res.render('destinations/index', { destinations });
  res.status(200).json({message: 'success', data: { destinations }});
}

module.exports.store = async (req, res, next) => {
  const images = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  const destination = new Destination(req.body.destination);
  destination.author = req.user._id;
  destination.images = images;
  await destination.save();
  req.flash('success_msg', 'Successfully add a new destination!');
  // res.redirect(`/destinations`);
  res.status(200).json({message: 'success', data: { destination }});
}

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findById(id).populate('reviews').populate('author');
  // res.render('destinations/show', { destination });
  res.status(200).json({message: 'success', data: { destination }});
}

module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findById(id);
  // res.render('destinations/edit', { destination });
  res.status(200).json({message: 'success', data: { destination }});
}

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findByIdAndUpdate(id, { ...req.body.destination })
  if (req.files && req.files.length > 0) {
    destination.images.forEach(image => {
      fs.unlink(image.url, err => new ExpressError(err));
    })

    const images = req.files.map(file => ({
      url: file.path,
      filename: file.filename
    }))
    destination.images = images;
    await destination.save();
  }
  req.flash('success_msg', 'Successfully update destination!');
  // res.redirect(`/destinations/${id}`);
  res.status(200).json({message: 'success', data: { destination }});
}

module.exports.destroy = async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findById(id);
  if (destination.images.length > 0) {
    destination.images.forEach(image => {
      fs.unlink(image.url, err => new ExpressError(err));
    })
  }

  await destination.deleteOne();

  req.flash('success_msg', 'Successfully delete destination!');
  // res.redirect('/destinations');
  res.status(200).json({message: 'success', data: { destination }});
}

module.exports.destroyImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { images } = req.body;
    
    if (!images && images.length === 0) {
      req.flash('error_msg', 'Please select at least 1 image!');
      // return res.redirect(`/destinations/${id}/edit`);
    }

    images.forEach(image => {
      fs.unlinkSync(image, err => new ExpressError(err));
    })

    await Destination.findByIdAndUpdate(id, { $pull: { images: { url: { $in: images } } } });

    req.flash('success_msg', 'Successfully delete image!');
    // res.redirect(`/destinations/${id}/edit`);
    res.status(200).json({message: 'success'});

  } catch (error) {
    req.flash('error_msg', error.message);
    // res.redirect(`/destinations/${id}/edit`);
    res.status(400).json({message: error.message});
  }
}