const express = require("express");
const router = express.Router();
exports.router = router;
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js")
const passport = require("passport")
const {saveRedirectUrl} = require("../middleware.js")
const userController = require("../controllers/users.js");

// user signup
router.route("/signup")
    .get(userController.renderSignup)
    .post(wrapAsync(userController.signUp))

// user login
router.route("/login")
    .get(userController.renderLogin)
    .post(saveRedirectUrl , 
        passport.authenticate("local" , { // local Strategy
            failureRedirect : "/users/login" ,
            failureFlash : true
        }) , 
        userController.logIn
    );

// user logout
router.get("/logout" , userController.logOut)

module.exports = router