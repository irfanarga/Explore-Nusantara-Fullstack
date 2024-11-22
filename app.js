const ejsMate = require('ejs-mate');
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Models
const Destination = require('./models/destination');

mongoose.connect('mongodb://127.0.0.1:27017/bestplace')
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

app.get('/destinations', async (req, res) => {
  const destinations = await Destination.find();
  res.render('destinations/index', { destinations });
  // res.send(destinations);
})

app.get('/destinations/create', (req, res) => {
  res.render('destinations/create');
})

app.post('/destinations', async (req, res) => {
  const destination = new Destination(req.body.destination);
  await destination.save();
  res.redirect(`/destinations`);
})

app.get('/destinations/:id', async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findById(id);
  res.render('destinations/show', { destination });
})

app.get('/destinations/:id/edit', async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findById(id);
  res.render('destinations/edit', { destination });
})

app.put('/destinations/:id', async (req, res) => {
  const { id } = req.params;
  await Destination.findByIdAndUpdate(id, { ...req.body.destination })
  res.redirect('/destinations');
})

app.delete('/destinations/:id', async (req, res) => {
  const { id } = req.params;
  await Destination.findByIdAndDelete(id);
  res.redirect('/destinations');
})

// app.get('/seed/destination', async (req, res) => {
//   const destination = new Destination({
//     name: 'Mount Fuji',
//     location: 'Japan',
//     description: 'Beautiful mountain in Japan',
//     image: 'https://source.unsplash.com/WLxQvbMyfas',
//     phone: 1234567890,
//     price: 1000000
//   })

//   await destination.save();
//   res.send(destination);
// })

app.listen(5000, () => {
  console.log('Server is running on port 5000');
})