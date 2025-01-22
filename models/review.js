const { types } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment : {
        type: String,
        required : true,
    },
    rating : {
        type: Number,
        min : 0,
        max : 5,
        required : true,
    },
    createdAt : {
        type : Date ,
        default : Date.now()
    }
})

const Review = mongoose.model("Review" , reviewSchema);

module.exports = Review;