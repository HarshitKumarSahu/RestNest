module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "you must be loggedIn to create or edit listing");
        return res.redirect("/users/login");
    }
    next();
}