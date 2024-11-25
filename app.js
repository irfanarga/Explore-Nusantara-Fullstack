const ejsMate = require('ejs-mate');
const express = require('express');
const path = require('path');
const app = express();
const joi = require('joi');
const ErrorHandler = require('./utils/ErrorHandler');
const mongoose = require('mongoose');
const wrapAsync = require('./utils/wrapAsync');
const methodOverride = require('method-override');

// Models
const Destination = require('./models/destination');

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

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/destinations', wrapAsync(async (req, res) => {
  const destinations = await Destination.find();
  res.render('destinations/index', { destinations });
  // res.send(destinations);
}))

app.get('/destinations/create', (req, res) => {
  res.render('destinations/create');
})

app.post('/destinations', wrapAsync(async (req, res, next) => {
  const destinationSchema = joi.object({
    destination: joi.object({
      name: joi.string().required(),
      location: joi.string().required(),
      description: joi.string().required(),
      image: joi.string().required(),
      phone: joi.string().required(),
      price: joi.number().min(0).required()
    }).required()
  })

  const { error } = destinationSchema.validate(req.body);
  if (error) {
    console.log(error);
    return next(new ErrorHandler(error, 400));
  }

  const destination = new Destination(req.body.destination);
  await destination.save();
  res.redirect(`/destinations`);
}))

app.get('/destinations/:id', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findById(id);
  res.render('destinations/show', { destination });
}))

app.get('/destinations/:id/edit', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findById(id);
  res.render('destinations/edit', { destination });
}))

app.put('/destinations/:id', wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Destination.findByIdAndUpdate(id, { ...req.body.destination })
  res.redirect('/destinations');
}))

app.delete('/destinations/:id', wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Destination.findByIdAndDelete(id);
  res.redirect('/destinations');
}))

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