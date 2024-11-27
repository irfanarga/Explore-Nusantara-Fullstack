const destinationController = require('../controllers/destinations');
const wrapAsync = require('../utils/wrapAsync');
const express = require('express');
const isValidObjectId = require('../middlewares/idValidObjectId');
const isAuth = require('../middlewares/isAuth');
const { isAuthorDestination } = require('../middlewares/isAuthor');
const { validateDestination } = require('../middlewares/validator');
const upload = require('../config/multer');


const router = express.Router();

router.route('/')
  .get(wrapAsync(destinationController.index))
  .post(isAuth, upload.array('image', 5), validateDestination, wrapAsync(destinationController.store));

router.get('/create', isAuth, (req, res) => {
  res.render('destinations/create');
})

router.route('/:id')
  .get(isValidObjectId('/destinations'), wrapAsync(destinationController.show))
  .put(isAuth, isAuthorDestination, isValidObjectId('/destinations'), upload.array('image', 5), validateDestination, wrapAsync(destinationController.update))
  .delete(isAuth, isAuthorDestination, isValidObjectId('/destinations'), wrapAsync(destinationController.destroy));

router.get('/:id/edit', isAuth, isAuthorDestination, isValidObjectId('/destinations'), wrapAsync(destinationController.edit));

router.delete('/:id/images', isAuth, isAuthorDestination, isValidObjectId('/destinations'), wrapAsync(destinationController.destroyImage));

module.exports = router;