const express = require("express");
const router = express.Router();
exports.router = router;

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { validateListing , isLoggedIn , isOwner } = require("../middleware.js")
const listingControllers = require("../controllers/listings.js")

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.route("/")
    .get(wrapAsync(listingControllers.index))
    // .post(validateListing , wrapAsync(listingControllers.newListing));
    .post(upload.single("listing[image]") ,(req,res)=>{
        res.send(req.file)
    });
// Index Route
// router.get("/" , wrapAsync(listingControllers.index));

// New Route
router.get("/new" , isLoggedIn , listingControllers.renderNewListing)
// router.post("/" , validateListing , wrapAsync(listingControllers.newListing));

router.route("/:id")
    .get(wrapAsync(listingControllers.showListing))
    .put(isLoggedIn , isOwner , validateListing , wrapAsync(listingControllers.updateListing))
    .delete(isLoggedIn , isOwner , wrapAsync(listingControllers.destroyListing));

// Show Route
// router.get("/:id" , wrapAsync(listingControllers.showListing));

// Edit Route
router.get("/:id/edit", isLoggedIn , isOwner , wrapAsync(listingControllers.editListing));

// Update Route
// router.put("/:id", isLoggedIn , isOwner , validateListing , wrapAsync(listingControllers.updateListing));

// Delete Route
// router.delete("/:id" , isLoggedIn , isOwner , wrapAsync(listingControllers.destroyListing));

module.exports = router;