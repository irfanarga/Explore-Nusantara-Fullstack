const LocalpreneurReview = require('../models/localpreneurReview');
const Localpreneur = require('../models/localpreneur');

module.exports.store = async (req, res) => {
  const localpreneurReview = new LocalpreneurReview(req.body.localpreneurReview);
  const localpreneur = await Localpreneur.findById(req.params.localpreneur_id);
  localpreneur.reviews.push(localpreneurReview);
  await localpreneurReview.save();
  await localpreneur.save();
  req.flash('success_msg', 'Successfully add Localpreneur Review!');
  res.redirect(`/localpreneurs/${req.params.localpreneur_id}`);
  // res.send({message: 'success', data: { localpreneurReview }});
}

module.exports.destroy = async (req, res) => {
  const { localpreneur_id, localpreneurReview_id } = req.params;
  await Localpreneur.findByIdAndUpdate(localpreneur_id, { $pull: { reviews: localpreneurReview_id } });
  await LocalpreneurReview.findByIdAndDelete(localpreneurReview_id);
  req.flash('success_msg', 'Successfully delete Localpreneur Review!');
  res.redirect(`/localpreneurs/${localpreneur_id}`);
}