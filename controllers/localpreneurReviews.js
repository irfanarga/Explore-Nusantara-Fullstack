const LocalpreneurReview = require('../models/localpreneurReview');
const Localpreneur = require('../models/localpreneur');

module.exports.index = async (req, res) => {
  const localpreneurReviews = await LocalpreneurReview.find();
  res.render('localpreneurs/index', { localpreneurReviews });
  // res.status(200).json({message: 'success', data: { localpreneurReviews }});
}

module.exports.store = async (req, res) => {
  const { localpreneur_id } = req.params;
  const localpreneurReview = new LocalpreneurReview(req.body.localpreneurReview);
  localpreneurReview.author = req.user._id;
  await localpreneurReview.save();
  const localpreneur = await Localpreneur.findById(localpreneur_id);
  localpreneur.reviews.push(localpreneurReview);
  await localpreneur.save();
  req.flash('success_msg', 'Successfully add Localpreneur Review!');
  res.redirect(`/localpreneurs/${localpreneur_id}`);
  // res.send({message: 'success', data: { localpreneurReview }});
}

module.exports.destroy = async (req, res) => {
  const { localpreneur_id, localpreneurReview_id } = req.params;
  await Localpreneur.findByIdAndUpdate(localpreneur_id, { $pull: { reviews: localpreneurReview_id } });
  await LocalpreneurReview.findByIdAndDelete(localpreneurReview_id);
  req.flash('success_msg', 'Successfully delete Localpreneur Review!');
  res.redirect(`/localpreneurs/${localpreneur_id}`);
  // res.send({message: 'success'});
}