const User = require("../models/user.js")

module.exports.renderSignup = (req,res) => {
    res.render("users/signup.ejs")
}

module.exports.signUp = async (req,res, next) => {
    try {
        let {username , email , password} = req.body;
        let newUser = new User({email, username});
        const registeredUser = await User.register(newUser , password);
        
        req.login(registeredUser , (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success" , "Welcome to RestNest Residence");
            res.redirect("/listings");
        });
    } catch(e) {
        req.flash("error" , e.message);
        res.redirect("/users/signup")
    }
}

module.exports.renderLogin =  (req,res) => {
    res.render("users/login.ejs")
}

module.exports.logIn = async (req,res) => {
    req.flash("success" , "welcome Back to RestNest Residence");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl)
}

module.exports.logOut = (req , res) => {
    req.logout((err) => {
        if(err) {
            next(err);
        }
        req.flash("success" , "you are logged out")
        res.redirect("/listings")
    })
}