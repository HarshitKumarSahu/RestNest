const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js")

const listings = require("./routes/listings.js")
const reviews = require("./routes/reviews.js")

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

app.get("/" , (req,res)=>{
    res.send("RestNest");
})

app.use("/listings", listings)
app.use("/listings/:id/reviews", reviews)

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





