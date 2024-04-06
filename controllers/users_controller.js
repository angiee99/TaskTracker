const User = require("../models/user");
const Issue = require("../models/issue");
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
    res.redirect("/issues");
};


module.exports.logout = async (req, res, next) => {
    // delete session
    console.log("deleting session cookie");
    req.session.userId = null;
    req.session.save((err) => {
      if (err) next(err);
      req.session.regenerate((err) => {
        if (err) next(err);
        res.redirect("/users/login");
      });
    });
};

module.exports.delete = async (req, res, next) => {
    const user = await User.findById(req.session.userId)
    if(!user){
        throw new ExpressError(404, `Not known user with id ${req.session.userId}`)
    }
    await Issue.deleteMany({author: req.session.userId}) 
    await user.deleteOne()

    res.render("deleted");
};