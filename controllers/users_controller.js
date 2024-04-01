const User = require("../models/user")
const ExpressError = require("../utils/ExpressError");

module.exports.renderRegister = (req, res, next) => {
    res.render("register");
}

module.exports.createUser = async (req, res, next) => {
    const { loginName, email, password } = req.validatedUser;
    const newUser = new User({ loginName, email, password }); 
    await newUser.save();

    res.redirect("/users/login"); 
}

module.exports.renderLogin  = (req, res, next) => {
    res.render("login");
}