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
    initData.data = initData.data.map((obj) => ({...obj , owner : "6797890a51c44d56d9cf9048"}))
    await Listing.insertMany(initData.data);
    console.log("data inserted in DB")
}

// only runs once to initialize sample data
initDB()