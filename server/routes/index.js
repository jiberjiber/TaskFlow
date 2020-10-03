// const config=require('config')
const path = require("path");
const app = require("express");
const router = require("express").Router();



// const user= require('./user-route')
const project = require("./project");
const scope = require("./scope");
const task = require("./task");
// const employee= require("./employee")
// const managerRoutes = require("./manager");
const companyRoutes = require("./company");
// const auth= require('./auth')
const employeeRoutes = require("./employee");
const teamRoutes = require("./team");



//if this route his hit use this route

router.use("/api/project/scope/task", task)
router.use("/api/project/scope", scope);
router.use("/api/project", project);
// router.use('/api/auth',auth);
// router.use("/api/signup/employee",employee);
router.use("/api/project/scope/task", task);
router.use("/api/employee", employeeRoutes);
router.use("/api/company", companyRoutes);
router.use("/api/team", teamRoutes);



// If no API routes are hit, send the React app

// router.use((req, res) => {
//   res.sendFile(path.join(__dirname, "../../client/build/index.html"));
// });




router.use((req, res)=> {
  res.sendFile(path.join(__dirname, "../../client/public/index.html"));
});

module.exports = router;
