Phase 1 :
1. DataBase setup
2. RESTful api for CRUD
3. Styling

app.js : contain all routes i.e CRUD
packages : express , ejs , path , mongoose , nodemon , method-override , ejs-mate , bootstrap , joi
models : listing -> title , description , image , price , location , country
data.js : contain staring data
index.js : used to initialize data in mongoDB
views -> listing -> index.ejs : list of all listing title
                 -> show.ejs : show specific details of listing by using there id 
                             : listing.price.toLocaleString("en-IN") : place commas to the number according to indian standards
                             : also contain edit & Delete options for listing
                 -> new.ejs : form for new listing : get , post
                 -> edit.ejs : form for edit : get , put.
views -> layouts -> boilerplate.ejs : contain boiler plate code files for all ejs files
views -> includes -> navbar.ejs : navbar for all ejs file
                  -> footer.ejs : footer for all ejs file
views -> error.ejs -> contain error structure for ejs files 
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