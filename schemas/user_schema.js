const Joi = require('joi');

module.exports.UserSchema = Joi.object({
  user: Joi.object({
    loginName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    passwordRepeated: Joi.string().min(8).required().valid(Joi.ref('password')),
  }).required(),
});

module.exports.UserEditedSchema = Joi.object({
  user: Joi.object({
    loginName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).allow(''),
    passwordRepeated: Joi.string().min(8).allow('').valid(Joi.ref('password')),
  }).required(),
});