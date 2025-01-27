const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")

const listingsRoute = require("./routes/listings.js")
const reviewsRoute = require("./routes/reviews.js")
const usersRoute = require("./routes/users.js")

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

const sessionOption = {
    secret : "mySuperDuperSecretCode" ,
    resave : false ,
    saveUninitialized : true ,
    cookies : {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days lifetime from now
        maxAge: 7 * 24 * 60 * 60 * 1000, // Alternative to `expires`: 7 days lifetime
        httpOnly: true   // Prevents client-side access
    }
}

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req , res , next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
})

app.use("/listings", listingsRoute)
app.use("/listings/:id/reviews", reviewsRoute)
app.use("/users" , usersRoute)

app.get("/" , (req,res)=>{
    res.send("RestNest");
})

// app.get("/demoUser" , async (req,res) => {
//     let fakeUser = new User({
//         email : "student01@gmail.com",
//         username : "deltaStudent01"
//     })

//     let newUser = await User.register(fakeUser , "helloworld");
//     res.send(newUser)
// })

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





