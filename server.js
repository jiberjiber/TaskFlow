// const config=require('config')
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./server/routes");
// const bodyParser = require("body-parser");
const moment = require('moment');
const Joi = require('joi');
const compression = require("compression");
require('dotenv').config();

// if(!process.env.SECRET){
//     console.error('JWT Priavte key not Defined');
//     process.exit(1)
//   }

const PORT = process.env.PORT || 3001;

const app = express();

//Middleware
app.use(logger("dev"));
app.use(compression()); // For compressing the response body to increase the speed of the web app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let mongoDataBase=process.env.NODE_ENV; 
//Static assets 
if (mongoDataBase === "production") {
    app.use(express.static("client/build"));
}

//Routes
app.use(routes);

//Connect to Mongo DB
//crossing out mongo so we can use our local db when testing
let mongo;
// process.env.MONGODB_URI
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