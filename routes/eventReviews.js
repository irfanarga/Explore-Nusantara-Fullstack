const eventReviewController = require('../controllers/eventReviews');
const isValidObjectId = require('../middlewares/idValidObjectId');
const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const isAuth = require('../middlewares/isAuth');
const { validateEventReview } = require('../middlewares/validator');
const { isAuthorReviewEvent } = require('../middlewares/isAuthor');

const router = express.Router({mergeParams: true});

router.route('/')
.get(wrapAsync(eventReviewController.index))
.post(isAuth, isValidObjectId('/events'), validateEventReview, wrapAsync(eventReviewController.store));

router.delete('/:eventReview_id', isAuth, isAuthorReviewEvent, isValidObjectId('/events'), wrapAsync(eventReviewController.destroy));

module.exports = router;