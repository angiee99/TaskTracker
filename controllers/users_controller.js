const User = require("../models/user");
const Issue = require("../models/issue");
const ExpressError = require("../utils/ExpressError");
const session = require("express-session");
const bcrypt = require("bcrypt")

module.exports.renderRegister = (req, res, next) => {
    res.render("register");
}

module.exports.createUser = async (req, res, next) => {
    const { loginName, email, password } = req.validatedUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ loginName, email, password: hashedPassword}); 
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
module.exports.renderEdit  = async(req, res, next) => {
    const user = await User.findById(req.session.userId);
    res.render("editUser", { user });
}

module.exports.saveEditedUser = async (req, res, next) => {

    const { loginName, email, password } = req.validatedUser;
    let updatedUser = {}
    if(!password || password==""){
            updatedUser = await User.findByIdAndUpdate(req.session.userId, 
            {loginName, email });
    }
    else{
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedUser = await User.findByIdAndUpdate(req.session.userId, 
            {loginName, email, password: hashedPassword});
    }

    if(!updatedUser){
        throw new ExpressError(404, `Failed to save edited user`)
    }
    await updatedUser.save()
    res.redirect("/issues"); 
}
