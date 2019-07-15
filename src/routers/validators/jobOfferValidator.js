const Joi = require('@hapi/joi');

const allowedCategories = [
  'IT',
  'Food & Drinks',
  'Office',
  'Courier',
  'Shop assistant'
];

module.exports = {
  newJobOffer: {
    body: {
      category: allowedCategories,
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      employerId: Joi.string().regex(/^[a-zA-Z0-9]{24}$/)
    }
  }
};
