const Joi = require('@hapi/joi');

module.exports = {
  newUser: {
    body: {
      login: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9!@#$%^&*)(+=._-]{3,30}$/)
    }
  },
  updateUser: {
    body: {
      login: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
      password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*)(+=._-]{3,30}$/)
    }
  }
};
