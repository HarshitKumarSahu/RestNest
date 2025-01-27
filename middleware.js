const Listing = require("./models/listing.js");
const Review = require("./models/review.js")
const ExpressError = require("./utils/ExpressError.js")
const {listingSchemaJoi , reviewSchemaJoi} = require("./schema.js");

// server side validation or error handling - listing
module.exports.validateListing = (req,res,next) => {
    let {error} = listingSchemaJoi.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(" , ");
        throw new ExpressError(400 , errMsg);
    } else {
        next()
    }
}

// server side validation or error handling - review
module.exports.validateReview = (req,res,next) => {
    let {error} = reviewSchemaJoi.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(" , ");
        throw new ExpressError(400 , errMsg);
    } else {
        next()
    }
}

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl
        req.flash("error", "you must be loggedIn to create or edit listing");
        return res.redirect("/users/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}

module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error" , "you are not the Owner of this Listing");
        return res.redirect(`/listings/${id}`)
    }
    next()
}

module.exports.isReviewAuthor = async (req,res,next) => {
    let { id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review || !review.author) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }
    if(!res.locals.currentUser || !review.author.equals(res.locals.currentUser._id)) {
        req.flash("error" , "You are not authorized to modify this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}