const Localpreneur = require('../models/localpreneur');
const fs = require('fs');
const ExpressError = require('../utils/ErrorHandler');

module.exports.index = async (req, res) => {
  const localpreneurs = await Localpreneur.find();
  // res.render('localpreneurs/index', { localpreneurs });
  res.status(200).json({message: 'success', data: { localpreneur }});
}

module.exports.store = async (req, res, next) => {
  const images = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  const localpreneur = new Localpreneur(req.body.localpreneur);
  localpreneur.author = req.user._id;
  localpreneur.images = images;
  await localpreneur.save();
  req.flash('success_msg', 'Successfully add a new localpreneur!');
  // res.redirect(`/localpreneurs`);
  res.status(200).json({message: 'success', data: { localpreneur }});
}

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const localpreneur = await Localpreneur.findById(id).populate('reviews');//.populate('author');
  // res.render('localpreneurs/show', { localpreneur });
  res.status(200).json({message: 'success', data: { localpreneur }});
}

module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const localpreneur = await Localpreneur.findById(id);
  // res.render('localpreneurs/edit', { localpreneur });
  res.status(200).json({message: 'success', data: { localpreneur }});
}

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const localpreneur = await Localpreneur.findByIdAndUpdate(id, { ...req.body.localpreneur })
  if (req.files && req.files.length > 0) {
    localpreneur.images.forEach(image => {
      fs.unlink(image.url, err => new ExpressError(err));
    })

    const images = req.files.map(file => ({
      url: file.path,
      filename: file.filename
    }))
    localpreneur.images = images;
    await localpreneur.save();
  }
  req.flash('success_msg', 'Successfully update localpreneur!');
  // res.redirect(`/localpreneurs/${id}`);
  res.status(200).json({message: 'success', data: { localpreneur }});
}

module.exports.destroy = async (req, res) => {
  const { id } = req.params;
  const localpreneur = await Localpreneur.findById(id);
  if (localpreneur.images.length > 0) {
    localpreneur.images.forEach(image => {
      fs.unlink(image.url, err => new ExpressError(err));
    })
  }

  await localpreneur.deleteOne();

  req.flash('success_msg', 'Successfully delete localpreneur!');
  // res.redirect('/localpreneurs');
  res.status(200).json({message: 'success', data: { localpreneur }});
}

module.exports.destroyImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { images } = req.body;
    
    if (!images && images.length === 0) {
      req.flash('error_msg', 'Please select at least 1 image!');
      // return res.redirect(`/localpreneurs/${id}/edit`);
    }

    images.forEach(image => {
      fs.unlinkSync(image, err => new ExpressError(err));
    })

    await Localpreneur.findByIdAndUpdate(id, { $pull: { images: { url: { $in: images } } } });

    req.flash('success_msg', 'Successfully delete image!');
    // res.redirect(`/localpreneurs/${id}/edit`);
    res.status(200).json({message: 'success'});

  } catch (error) {
    req.flash('error_msg', error.message);
    // res.redirect(`/localpreneurs/${id}/edit`);
    res.status(400).json({message: error.message});
  }
}