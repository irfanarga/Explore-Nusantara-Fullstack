const ejsMate = require('ejs-mate');
const express = require('express');
const path = require('path');
const app = express();
// npm i express-session
const session = require('express-session');
// npm i connect-flash
const flash = require('connect-flash');
const ErrorHandler = require('./utils/ErrorHandler');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const cors = require('cors');
// npm install passport passport-local-mongoose


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
app.use(cors());
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
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})

app.get('/', (req, res) => {
  res.render('home');
})

app.use('/', require('./routes/auth'));
app.use('/destinations', require('./routes/destinations'));
app.use('/destinations/:destination_id/reviews', require('./routes/reviews'));
app.use('/localpreneurs', require('./routes/localpreneurs'));
app.use('/localpreneurs/:localpreneur_id/localpreneurreviews', require('./routes/localpreneurReviews'));
app.use('/events', require('./routes/events'));
app.use('/events/:event_id/eventreviews', require('./routes/eventReviews'));

app.all('*', (req, res, next) => {
  next(new ErrorHandler('Page Not Found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something went wrong';
  res.status(statusCode).render('error', { err });
})

app.listen(443, () => {
  console.log('Server is running on port 443');
})