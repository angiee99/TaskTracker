const { IssueSchema } = require('../schemas/issue_schema');
const ExpressError = require('../utils/ExpressError');

module.exports.validateIssue = (req, res, next) => {
  const { error, value } = IssueSchema.validate(req.body);
  if (error) {
    const message = error.details.map((e) => e.message).join(',');
    return next(new ExpressError(400, message));
  } else {
    req.validatedIssue = value.issue;
    next();
  }
}