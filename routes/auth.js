const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');

router.route('/register')
  .get(authController.registerForm)
  .post(wrapAsync(authController.store));

router.route('/login')
  .get(authController.loginForm)
  .post(passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: {
      type: 'error_msg',
      message: 'Invalid username or password'
    }
  }), authController.login);

router.post('/logout', authController.logout);

module.exports = router