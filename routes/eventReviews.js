const eventReviewController = require('../controllers/eventReviews');
const isValidObjectId = require('../middlewares/idValidObjectId');
const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const isAuth = require('../middlewares/isAuth');
const { validateEventReview } = require('../middlewares/validator');

const router = express.Router({mergeParams: true});

router.post('/', isAuth, isValidObjectId('/events'), validateEventReview, wrapAsync(eventReviewController.store));

router.delete('/:eventReview_id', isAuth, isValidObjectId('/events'), wrapAsync(eventReviewController.destroy));

module.exports = router;