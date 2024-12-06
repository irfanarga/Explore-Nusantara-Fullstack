const localpreneurReviewController = require('../controllers/localpreneurReviews');
const isValidObjectId = require('../middlewares/idValidObjectId');
const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const isAuth = require('../middlewares/isAuth');
const { validateLocalpreneurReview } = require('../middlewares/validator');
const { isAuthorReviewLocalpreneur } = require('../middlewares/isAuthor');

const router = express.Router({mergeParams: true});

router.route('/')
.get(wrapAsync(localpreneurReviewController.index))
.post(isAuth, isValidObjectId('/localpreneurs'), validateLocalpreneurReview, wrapAsync(localpreneurReviewController.store));

router.delete('/:localpreneurReview_id', isAuth, isAuthorReviewLocalpreneur, isValidObjectId('/localpreneurs'), wrapAsync(localpreneurReviewController.destroy));

module.exports = router;