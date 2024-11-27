const User = require('../models/user');

module.exports.registerForm = (req, res) => {
  res.render('auth/register');
}

module.exports.store = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success_msg', 'Successfully register and logged in!');
      res.redirect('/destinations');
    })
  } catch (error) {
    req.flash('error_msg', error.message);
    res.redirect('/register');
  }
}

module.exports.loginForm = (req, res) => {
  res.render('auth/login');
}

module.exports.login = (req, res) => {
  req.flash('success_msg', 'Successfully login!');
  res.redirect('/destinations');
}

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'Successfully logout!');
    res.redirect('/login');
  })
}