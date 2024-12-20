const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")
const {listingSchemaJoi} = require("./schema.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/RestNest"

main()
    .then(()=>{
        console.log("mongoDB connected")
    })
    .catch((err)=>{
        console.log(err);
    })

async function main() {
    await mongoose.connect(MONGO_URL);
}

// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname , "/public")));

// server side validation or error handling
const validateListing = (req,res,next) => {
    let {error} = listingSchemaJoi.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(" , ");
        throw new ExpressError(400 , errMsg);
    } else {
        next()
    }
}

app.get("/" , (req,res)=>{
    res.send("RestNest");
})

// Index Route
app.get("/listings" , wrapAsync(async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listing/index.ejs" , {allListing})
}));

// New Route
app.get("/listings/new" , (req,res)=>{
    res.render("listing/new.ejs")
})
app.post("/listings" , validateListing , wrapAsync(async (req,res,next)=>{
    const newListing = Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings")
}));

// Show Route
app.get("/listings/:id" , wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/show.ejs" , {listing})
}));

// Edit Route
app.get("/listings/:id/edit" , wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit.ejs" , {listing})
}));

// Update Route
app.put("/listings/:id" , validateListing , wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect(`/listings/${id}`)
}));

// Delete Route
app.delete("/listings/:id" , wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Deleted Data", deletedListing)
    res.redirect("/listings");
}));


// except all existing routs errors
app.all("*" , (req,res,next)=>{
    next(new ExpressError(404, "Page Not Found"));
}) 

// error handling middleware
app.use((err, req, res, next)=>{
    let {status = 500 , message = "something went wrong"} = err;
    // res.status(status).send(message);
    res.render("error.ejs" , {message});
})

app.listen("8080" , ()=>{
    console.log("app is listening at 8080");
})





