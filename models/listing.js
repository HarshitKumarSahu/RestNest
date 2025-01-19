const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    }, 
    image : {
        type : Object,
        default : "https://images.unsplash.com/photo-1517840901100-8179e982acb7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set : (v) => v==="" ? "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    }, 
    price : {
        type : Number,
        required : true,
    }, 
    location : {
        type : String,
        required : true,
    },
    country : {
        type : String,
        required : true,
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        }
    ]
});

const Listing = mongoose.model("Listing" , listingSchema);

module.exports = Listing;
