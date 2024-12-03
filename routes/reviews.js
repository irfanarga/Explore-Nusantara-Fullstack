const reviewController = require('../controllers/reviews');
const isValidObjectId = require('../middlewares/idValidObjectId');
const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const isAuth = require('../middlewares/isAuth');
const { validateReview } = require('../middlewares/validator');

const router = express.Router({mergeParams: true});

router.route('/')
.get(wrapAsync(reviewController.index))
.post(isAuth, isValidObjectId('/destinations'), validateReview, wrapAsync(reviewController.store));

router.delete('/:review_id', isAuth, isValidObjectId('/destinations'), wrapAsync(reviewController.destroy));

module.exports = router;