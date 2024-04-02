const User = require("../models/user")
const ExpressError = require("../utils/ExpressError");
const session = require("express-session");

module.exports.renderRegister = (req, res, next) => {
    res.render("register");
}

module.exports.createUser = async (req, res, next) => {
    const { loginName, email, password } = req.validatedUser;
    // hashing the password 
    const newUser = new User({ loginName, email, password }); 
    await newUser.save();

    res.redirect("/users/login"); 
}

module.exports.renderLogin  = (req, res, next) => {
    res.render("login");
}


module.exports.loginUser = async (req, res, next) => {
    const { username, _id } = req.user;
    req.session.userId = _id;
    console.log("Login successful");
    res.redirect("/issues");
};