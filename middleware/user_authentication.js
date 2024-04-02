const ExpressError = require("../utils/ExpressError");
const User = require("../models/user")

module.exports.userValidToLogin = async (req, res, next) =>{
    const {loginName, password} = req.body;
    const user = await User.findOne({loginName});
    if(!user){
        throw new ExpressError(401, "The login name is incorrect")
    }
    if(!(user.password === password)){ // compare hashes later
        throw new ExpressError(401, "The password is incorrect")
    }
    req.user = user;
    next()
} 

module.exports.isAuthorized = async (req, res, next) =>{
    next()
} 

module.exports.isLoggedIn = async (req, res, next) =>{
    if (!req.session.userId) {
        return next(new ExpressError(401, "User is not logged in. Login is needed for this functionality"));
    } 
    console.log("user is logged in");
    next();
}  

module.exports.isAuthor = async (req, res, next) =>{
    next()
}  