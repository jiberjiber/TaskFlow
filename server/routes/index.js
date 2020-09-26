const path = require("path");
const router = require('express').Router();

// const user= require('./user-route')
const project= require('./project') 
const scope= require('./scope')

//if this route his hit use this route
router.use('/api/project', project);
router.use('/api/project/scope',scope)

// If no API routes are hit, send the React app

router.use((req, res)=> {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });

  // router.use((req, res)=> {
  //   res.sendFile(path.join(__dirname, "../../client/public/index.html"));
  // });
  

  module.exports = router;