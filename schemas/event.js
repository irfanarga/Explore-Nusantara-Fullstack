const joi = require('joi');

const eventSchema = joi.object({
  event: joi.object({
    name: joi.string().required(),
    location: joi.string().required(),
    description: joi.string().required(),
    city: joi.string().required(),
    phone: joi.string().required(),
    price: joi.number().min(0).required(),
    date: joi.date().required()
  }).required()
})

module.exports = eventSchema;