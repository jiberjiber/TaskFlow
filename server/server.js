const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
require('dotenv').config()


const PORT = process.env.PORT || 3000;



//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static assets 
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//Routes
app.use(routes);

//Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/______"); //missing database name


//Start server
app.listen(PORT, () => {
    console.log(`Server now listening on PORT ${PORT}`);
})