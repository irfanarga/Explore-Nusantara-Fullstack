const joi = require('joi');

const reviewSchema = joi.object({
  review: joi.object({
    rating: joi.number().min(1).max(5).required(),
    body: joi.string().min(5).required()
  }).required()
})

module.exports = reviewSchema;