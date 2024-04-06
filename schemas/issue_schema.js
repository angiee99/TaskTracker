const Joi = require('joi');

module.exports.IssueSchema = Joi.object({
  issue: Joi.object({
    name: Joi.string().required(),
    completed: Joi.boolean(),
    details: Joi.string().allow(''), 
    priority: Joi.string().allow(''), // add rules for priority
    time_start: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).allow(''), 
    time_end: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).allow('')
  }).required(),
});
