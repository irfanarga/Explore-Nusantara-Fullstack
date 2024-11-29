const localpreneurController = require('../controllers/localpreneurs');
const wrapAsync = require('../utils/wrapAsync');
const express = require('express');
const isValidObjectId = require('../middlewares/idValidObjectId');
const isAuth = require('../middlewares/isAuth');
const { isAuthorLocalpreneur } = require('../middlewares/isAuthor');
const { validateLocalpreneur } = require('../middlewares/validator');
const upload = require('../config/multer');


const router = express.Router();

router.route('/')
  .get(wrapAsync(localpreneurController.index))
  .post(isAuth, upload.array('image', 5), validateLocalpreneur, wrapAsync(localpreneurController.store));

router.get('/create', isAuth, (req, res) => {
  res.render('localpreneurs/create');
})

router.route('/:id')
  .get(isValidObjectId('/localpreneurs'), wrapAsync(localpreneurController.show))
  .put(isAuth, isAuthorLocalpreneur, isValidObjectId('/localpreneurs'), upload.array('image', 5), validateLocalpreneur, wrapAsync(localpreneurController.update))
  .delete(isAuth, isAuthorLocalpreneur, isValidObjectId('/localpreneurs'), wrapAsync(localpreneurController.destroy));

router.get('/:id/edit', isAuth, isAuthorLocalpreneur, isValidObjectId('/localpreneurs'), wrapAsync(localpreneurController.edit));

router.delete('/:id/images', isAuth, isAuthorLocalpreneur, isValidObjectId('/localpreneurs'), wrapAsync(localpreneurController.destroyImage));

module.exports = router;