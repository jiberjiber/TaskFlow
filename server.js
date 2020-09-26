const express = require("express");
const mongoose = require("mongoose");
const routes = require("./server/routes");
const app = express();
const path = require("path");


require('dotenv').config()
const moment = require('moment');


const PORT = process.env.PORT || 3001;



//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let mongoDataBase=process.env.NODE_ENV 
//Static assets 
if (mongoDataBase === "production") {
    app.use(express.static("client/build"));
}

//Routes
app.use(routes);

//Connect to Mongo DB

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/management", {
    useNewUrlParser: true,
    useFindAndModify: false,
     useUnifiedTopology: true 
  });


 mongoose.connection.on('connected',()=>{
    console.log('Mongoose connected')
  })
  

//Start server
app.listen(PORT, () => {
    console.log(`Server now listening on PORT ${PORT}`);
})