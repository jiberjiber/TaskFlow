const path = require("path");
const router = require('express').Router();

// const user= require('./user-route')
// const project= require('./')

// If no API routes are hit, send the React app
router.use((req, res)=> {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  

  module.exports = router;