const { UserSchema } = require("../schemas/user_schema")
const ExpressError = require("../utils/ExpressError");

module.exports.validateUser = (req, res, next) => {
    const { error, value } = UserSchema.validate(req.body);
    if (error) {
      const message = error.details.map((e) => e.message).join(',');
      throw new ExpressError(400, message);
    } else {
      req.validatedUser = value.user;
      next();
    }
}