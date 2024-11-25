const joi = require('joi');

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

module.exports = destinationSchema;