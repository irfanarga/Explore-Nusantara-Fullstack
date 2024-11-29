const joi = require('joi');

const localpreneurSchema = joi.object({
  localpreneur: joi.object({
    name: joi.string().required(),
    location: joi.string().required(),
    description: joi.string().required(),
    city: joi.string().required(),
    phone: joi.string().required(),
    price: joi.number().min(0).required()
  }).required()
})

module.exports = localpreneurSchema;