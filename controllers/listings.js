const Listing = require("../models/listing.js");

module.exports.index = async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listing/index.ejs" , {allListing})
}

module.exports.renderNewListing = (req,res)=>{
    res.render("listing/new.ejs")
}

module.exports.newListing = async (req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = Listing(req.body.listing);
    newListing.owner = req.user._id
    newListing.image = {url, filename} 
    await newListing.save();
    req.flash("success" , "New Listing Created!")
    res.redirect("/listings")
}


module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({ 
            path : "reviews" , 
            populate : { 
                path : "author" 
            }
        })
        .populate("owner");
    if(!listing) {
        req.flash("error", "No Listing Found!");
        res.redirect("/listings")
    }
    res.render("listing/show.ejs" , {listing})
}

module.exports.editListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "No Listing Found!");
        res.redirect("/listings")
    }
    res.render("listing/edit.ejs" , {listing})
}

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing});

    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename} 
        await listing.save()
    }

    req.flash("success" , "Listing Updated!")
    res.redirect(`/listings/${id}`)
}

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    // console.log("Deleted Data", deletedListing)
    req.flash("success" , "Listing Deleted!")
    res.redirect("/listings");
}