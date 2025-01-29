const mongoose = require("mongoose");
const initData = require("./data.js")
const Listing = require("../models/listing.js");

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

const initDB = async ()=> {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj , owner : "679a35ef8e34e1eb0636d2ae"}))
    await Listing.insertMany(initData.data);
    console.log("data inserted in DB")
}

// only runs once to initialize sample data
initDB()