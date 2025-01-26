const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js")
const passport = require("passport")

router.get("/signup" , (req,res) => {
    res.render("users/signup.ejs")
})

router.post("/signup" , wrapAsync(async (req,res) => {
    try {
        let {username , email , password} = req.body;
        let newUser = new User({email, username});
        const registeredUser = await User.register(newUser , password);
        console.log(registeredUser);
        req.flash("success" , "Welcome to RestNest Residence");
        res.redirect("/listings")
    } catch(e) {
        req.flash("error" , e.message);
        res.redirect("/users/signup")
    }
}))

router.get("/login" , (req,res) => {
    res.render("users/login.ejs")
})

router.post(
    "/login" , 
    passport.authenticate("local" , { // local Strategy
        failureRedirect : "/users/login" ,
        failureFlash : true
    }) , 
    async (req,res) => {
       req.flash("success" , "welcome Back to RestNest Residence");
       res.redirect("/listings")
})

module.exports = router