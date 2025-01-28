const express = require("express");
const router = express.Router();
exports.router = router;

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { validateListing , isLoggedIn , isOwner } = require("../middleware.js")
const listingControllers = require("../controllers/listings.js")

// Index Route
router.get("/" , wrapAsync(listingControllers.index));

// New Route
router.get("/new" , isLoggedIn , listingControllers.renderNewListing)
router.post("/" , validateListing , wrapAsync(listingControllers.newListing));

// Show Route
router.get("/:id" , wrapAsync(listingControllers.showListing));

// Edit Route
router.get("/:id/edit", isLoggedIn , isOwner , wrapAsync(listingControllers.editListing));

// Update Route
router.put("/:id", isLoggedIn , isOwner , validateListing , wrapAsync(listingControllers.updateListing));

// Delete Route
router.delete("/:id" , isLoggedIn , isOwner , wrapAsync(listingControllers.destroyListing));

module.exports = router;