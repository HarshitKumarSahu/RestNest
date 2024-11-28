const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");

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

// Index Route
app.get("/listings" , async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listing/index.ejs" , {allListing})
})

// New Route
app.get("/listings/new" , (req,res)=>{
    res.render("listing/new.ejs")
})
app.post("/listings" , async (req,res,next)=>{
    try {
        const newListing = Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings")
    } catch(err) {
        next(err)
    }

})

// Show Route
app.get("/listings/:id" , async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/show.ejs" , {listing})
})

// Edit Route
app.get("/listings/:id/edit" , async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit.ejs" , {listing})
})

// Update Route
app.put("/listings/:id" , async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect(`/listings/${id}`)
})

// Delete Route
app.delete("/listings/:id" , async (req,res)=>{
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Deleted Data", deletedListing)
    res.redirect("/listings");
})


// app.get("/testlisting" , async (req,res)=>{
//     let samplelisting = new Listing({
//         title: "Sample Listing 2",
//         description: "This is a second sample listing for demonstration purposes.",
//         price: 200,
//         location: "123 Main Second",
//         country: "UK"
//     })
    
//     await samplelisting.save()
//         .then((res)=>{
//             console.log("sample was saved");
//             console.log(res);
//         })
//         .catch((err)=>{
//             console.log("err");
//         })
//     res.send("success...")
// })

// error handling middleware
app.use((err, req, res, next)=>{
    console.log(err);
    res.send("something went wrong");
})

app.listen("8080" , ()=>{
    console.log("app is listening at 8080");
})
