const ExpressError = require("../utils/ExpressError");
const User = require("../models/user");
const Issue = require("../models/issue");
const session = require("express-session");
const bcrypt = require("bcrypt");

module.exports.userValidToLogin = async (req, res, next) =>{
    const {loginName, password} = req.body;
    const user = await User.findOne({loginName});
    if(!user){
        throw new ExpressError(401, "The login name is incorrect")
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){ // compares hashes
        throw new ExpressError(401, "The password is incorrect")
    }
    req.user = user;
    next()
} 

module.exports.isLoggedIn = async (req, res, next) =>{
    if (!req.session.userId) {
        return res.redirect("users/login");
    } 
    next();
}  

module.exports.isAuthor = async (req, res, next) =>{
    const { id } = req.params;
    const issue = await Issue.findById(id);
    if(!issue){
        return next(new ExpressError(404, `Not known issue with id ${id}`));
    }
    if (req.session.userId != issue.author) {
        return next(new ExpressError(401, "User is not authorized"));
    } 
    next()
}  