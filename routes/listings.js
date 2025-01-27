const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {listingSchemaJoi} = require("../schema.js");
const { required } = require("joi");
const {isLoggedIn} = require("../middleware.js")

// server side validation or error handling - listing
const validateListing = (req,res,next) => {
    let {error} = listingSchemaJoi.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(" , ");
        throw new ExpressError(400 , errMsg);
    } else {
        next()
    }
}

// Index Route
router.get("/" , wrapAsync(async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listing/index.ejs" , {allListing})
}));

// New Route
router.get("/new" , isLoggedIn , (req,res)=>{
    res.render("listing/new.ejs")
})
router.post("/" , validateListing , wrapAsync(async (req,res,next)=>{
    const newListing = Listing(req.body.listing);
    await newListing.save();
    req.flash("success" , "New Listing Created!")
    res.redirect("/listings")
}));

// Show Route
router.get("/:id" , wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing) {
        req.flash("error", "No Listing Found!");
        res.redirect("/listings")
    }
    res.render("listing/show.ejs" , {listing})
}));

// Edit Route
router.get("/:id/edit", isLoggedIn  , wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "No Listing Found!");
        res.redirect("/listings")
    }
    res.render("listing/edit.ejs" , {listing})
}));

// Update Route
router.put("/:id", isLoggedIn , validateListing , wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    req.flash("success" , "Listing Updated!")
    res.redirect(`/listings/${id}`)
}));

// Delete Route
router.delete("/:id" , isLoggedIn , wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    // console.log("Deleted Data", deletedListing)
    req.flash("success" , "Listing Deleted!")
    res.redirect("/listings");
}));

module.exports = router;