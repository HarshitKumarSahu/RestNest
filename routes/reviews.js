const express = require("express");
const router = express.Router({mergeParams : true});

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {reviewSchemaJoi} = require("../schema.js")

// server side validation or error handling - review
const validateReview = (req,res,next) => {
    let {error} = reviewSchemaJoi.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(" , ");
        throw new ExpressError(400 , errMsg);
    } else {
        next()
    }
}

// Reviews - post route
router.post("/" , validateReview , wrapAsync(async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success" , "New Review Created!")
    res.redirect(`/listings/${listing._id}`)
}))

// Reviews - delete route
router.delete("/:reviewId" , wrapAsync( async (req,res) => {
    let {id , reviewId} = req.params;

    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success" , "Review deleted!")
    res.redirect(`/listings/${id}`);
}))

module.exports = router;