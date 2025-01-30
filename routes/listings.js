const express = require("express");
const router = express.Router();
exports.router = router;

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { validateListing , isLoggedIn , isOwner } = require("../middleware.js")
const listingControllers = require("../controllers/listings.js")

const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

router.route("/")
    .get(wrapAsync(listingControllers.index))
    .post(upload.single("listing[image]") , validateListing , wrapAsync(listingControllers.newListing));


// New Route
router.get("/new" , isLoggedIn , listingControllers.renderNewListing)

router.route("/:id")
    .get(wrapAsync(listingControllers.showListing))
    .put(isLoggedIn , isOwner , validateListing , wrapAsync(listingControllers.updateListing))
    .delete(isLoggedIn , isOwner , wrapAsync(listingControllers.destroyListing));

// Edit Route
router.get("/:id/edit", isLoggedIn , isOwner , wrapAsync(listingControllers.editListing));

module.exports = router;