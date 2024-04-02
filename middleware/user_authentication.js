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