const ejsMate = require('ejs-mate');
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const ErrorHandler = require('./utils/ErrorHandler');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


mongoose.connect('mongodb://127.0.0.1:27017/bestplace')
// mongoose.connect('mongodb://localhost:27017/bestplace')
  .then((results) => {
    console.log('Connected to database');
  }).catch((err) => {
    console.log(err);
  })

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})

app.get('/', (req, res) => {
  res.render('home');
})

app.use('/destinations', require('./routes/destinations'));
app.use('/destinations/:destination_id/reviews', require('./routes/reviews'));

app.all('*', (req, res, next) => {
  next(new ErrorHandler('Page Not Found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something went wrong';
  res.status(statusCode).render('error', { err });
})

app.listen(5000, () => {
  console.log('Server is running on port 5000');
})