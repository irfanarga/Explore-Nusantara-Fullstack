const joi = require('joi');

const eventReviewSchema = joi.object({
  eventReview: joi.object({
    rating: joi.number().min(1).max(5).required(),
    body: joi.string().min(5).required()
  }).required()
})

module.exports = eventReviewSchema;