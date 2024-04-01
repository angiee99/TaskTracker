const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const catchAsync = require('../utils/catchAsynch');

router
    .route("/register")
    .get(userController.renderRegister)
    .post(userController.createUser);

router
    .route("/login")
    .get(userController.renderLogin);
    // .post(userController.loginUser);

module.exports = router;