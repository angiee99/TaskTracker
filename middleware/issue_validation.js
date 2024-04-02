const { IssueSchema } = require('../schemas/issue_schema');
const ExpressError = require('../utils/ExpressError');
const Joi = require('joi');

module.exports.validateIssue = (req, res, next) => {
  const { error, value } = IssueSchema.validate(req.body);
  if (error) {
    const message = error.details.map((e) => e.message).join(',');
    throw new ExpressError(400, message);
  } else {
    req.validatedIssue = value.issue;
    next();
  }
}