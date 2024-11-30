const eventController = require('../controllers/events');
const wrapAsync = require('../utils/wrapAsync');
const express = require('express');
const isValidObjectId = require('../middlewares/idValidObjectId');
const isAuth = require('../middlewares/isAuth');
const { isAuthorEvent } = require('../middlewares/isAuthor');
const { validateEvent } = require('../middlewares/validator');
const upload = require('../config/multer');


const router = express.Router();

router.route('/')
  .get(wrapAsync(eventController.index))
  .post(isAuth, upload.array('image', 5), validateEvent, wrapAsync(eventController.store));

router.get('/create', isAuth, (req, res) => {
  res.render('events/create');
})

router.route('/:id')
  .get(isValidObjectId('/events'), wrapAsync(eventController.show))
  .put(isAuth, isAuthorEvent, isValidObjectId('/events'), upload.array('image', 5), validateEvent, wrapAsync(eventController.update))
  .delete(isAuth, isAuthorEvent, isValidObjectId('/events'), wrapAsync(eventController.destroy));

router.get('/:id/edit', isAuth, isAuthorEvent, isValidObjectId('/events'), wrapAsync(eventController.edit));

router.delete('/:id/images', isAuth, isAuthorEvent, isValidObjectId('/events'), wrapAsync(eventController.destroyImage));

module.exports = router;