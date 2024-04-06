const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const catchAsync = require('../utils/catchAsynch');
const { validateUser } = require('../middleware/user_validation');
const { userValidToLogin, isLoggedIn } = require('../middleware/user_authentication');


router
    .route("/register")
    .get(userController.renderRegister)
    .post(validateUser, catchAsync(userController.createUser));

router
    .route("/login")
    .get(userController.renderLogin)
    .post(catchAsync(userValidToLogin), catchAsync(userController.loginUser));

router
    .route("/logout")
    .get(isLoggedIn, catchAsync(userController.logout));
    
router
    .route("/delete")
    .delete(isLoggedIn, catchAsync(userController.delete)); 

module.exports = router;