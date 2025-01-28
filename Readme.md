Phase 1 :
1. DataBase setup
2. RESTful api for CRUD
3. Styling

Phase 2 :
1. Review model
2. User model
4. router folder
3. logIn , signUp , logOut

Phase 3 :
1. Controller

app.js : contain all routes i.e CRUD

packages : express , ejs , path , mongoose , nodemon , method-override , ejs-mate , bootstrap , joi , express-session ,             connect-flash , passport , passport-local , passport-local-mongoose    

models : listing.js -> title , description , image , price , location , country
         review.js -> comment , rating , createdAt , author
         user.js -> email , username , password 

router : listings.js -> all routes related to listing
         reviews.js -> all routes related to review
         users.js -> all routes related to user

views : listing -> index.ejs : list of all listing title
                 -> show.ejs : show specific details of listing by using there id and contain reviews
                             : listing.price.toLocaleString("en-IN") : place commas to the number according to indian standards
                             : also contain edit & Delete options for listing
                 -> new.ejs : form for new listing : get , post
                 -> edit.ejs : form for edit : get , put.
views : layouts -> boilerplate.ejs : contain boiler plate code files for all ejs files
views : includes -> navbar.ejs : navbar for all ejs file
                  -> footer.ejs : footer for all ejs file
                  -> flash.ejs : contain flash html structure
views : users -> login.ejs : login page
               -> signup.ejs : signup page
views : error.ejs -> contain error structure for ejs files 

ejs-mate : used to create a boiler plate codes for ejs files
         : const ejsMate = require("ejs-mate");
         : app.engine('ejs', ejsMate); -> use ejs-locals for all ejs templates
         : <%- body %> : include raw HTML content that you trust and want to render as HTML.
         : <% layout("/layouts/boilerplate") %> : include boilerplate.ejs file for all ejs files

public -> css -> style.css : contain style for ejs files
       -> js -> script.js : contain all js part for ejs files

utils -> contain all utilites of project i.e ExpressError.js wrapAsync.js ... etc
      -> wrapAsync.js : contain wrapAsync()
      -> ExpressError.js : contain custom error class for middleware

schema.js -> contain joi schema validation for server side schema validation

inti : data.js -> contain staring data
       index.js -> used to initialize data in mongoDB

middleware.js -> contain all middlewares
              -> validateListing , validateReview , isLoggedIn , saveRedirectUrl , isOwner , isReviewAuthor

controllers : handles user requests, processes data via the Model, and returns responses through the View.
            : listings.js -> Handles logic, processes requests, and interacts with the listing model
            : reviews.js -> Handles logic, processes requests, and interacts with the review model
            : users.js -> Handles logic, processes requests, and interacts with the user model