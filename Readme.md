Phase 1 :
1. DataBase setup
2. RESTful api for CRUD

packages : express , ejs , path , mongoose , nodemon , app.js
models : listing -> title , description , image , price , location , country
data.js : contain staring data
index.js : used to initialize data in mongoDB
views -> listing -> index.ejs : list of all listing title
                 -> show.ejs : show specific details of listing by using there id 
                             : listing.price.toLocaleString("en-IN") : place commas to the number according to indian standards