const path = require("path");
const router = require('express').Router();

// const user= require('./user-route')
const project= require('./project') 
const scope= require('./scope')
const task=require('./task')

//if this route his hit use this route
router.use('/api/project/scope/task',task)
router.use('/api/project/scope',scope)
router.use('/api/project', project);



// If no API routes are hit, send the React app

// router.use((req, res)=> {
//     res.sendFile(path.join(__dirname, "../../client/build/index.html"));
//   });

  router.use((req, res)=> {
    res.sendFile(path.join(__dirname, "../../client/public/index.html"));
  });
  

  module.exports = router;