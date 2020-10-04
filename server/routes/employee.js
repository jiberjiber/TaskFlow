// require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Employee, Company, Team } = require("../models");
const {
  validateSignupData,
  validate,
} = require("../middleware/signupValidate");
const auth = require("../middleware/auth");
const manager = require("../middleware/managerAuth");
const isManager = require("../middleware/managerAuth");
const { Project } = require("../models/project.js");
const { Scope } = require("../models/scope.js");

//Register new employee
router.post("/register", validateSignupData(), validate, async (req, res) => {
  try {
    const data = req.body;
    const getEmployee = await Employee.findOne({ email: req.body.email });
    if (getEmployee) {
      return res
        .status(400)
        .json({ email: "This email already exists. Please sign in instead." });
    } else {
      const employee = new Employee({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        isManager: data.isManager,
        email: data.email,
        password: data.password,
        company: data.company,
      });

      let employeeId = await employee.returnid();
      let pass = employee.returnPassword();
      const salt = await bcrypt.genSalt(10);
      employee.password = await bcrypt.hash(pass, salt);

      await employee.save();

      const employeeCompany = await Company.findByIdAndUpdate(
        { _id: req.body.company },
        { $push: { employees: employeeId } },
        { new: true }
      );
      // console.log(`USERNAME: ${employee.username}`);

      await employeeCompany.save();
      res.send({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        _id: employee._id,
        isManager: employee.isManager,
        company: data.company,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

//User login
router.post("/login", [auth,manager], async (req, res) => {
  const checkUser = await Employee.findOne({ email: req.body.email });
  console.log(req.body);
  if (!checkUser) return res.status(400).send("iuser not registered ");

  const validPassword = await bcrypt.compare(
    req.body.password,
    checkUser.password
  );
  if (!validPassword) return res.status(400).send("invalid email or password");

  const token = await checkUser.generateToken();

  res.send(token);
  console.log(token);
});

//Get all users
router.get("/", [auth,manager], async (req, res) => {
  const employees = await Employee.find().select().sort("lastName");

  if (!employees) return res.status(400).send("No employees found.");

  let employeeData = employees;
  let employeeArr = [];

  employeeData.map((employee) => {
    employee._id,
      employee.lastName,
      employee.username,
      employee.isManager,
      employee.email,
      employee.projectsCreated,
      employee.projectsAssigned,
      employee.company;

    return employeeArr.push(employee);
  });
  res.send(employeeArr);
});

//Get user by id
router.get("/:id", [auth,manager], async (req, res) => {
  const getOneEmployee = await Employee.find({ _id: req.params.id }).select();

  if (!getOneEmployee)
    return res.status(400).send("The employee with this ID does not exist.");

  res.send(getOneEmployee);
});


module.exports = router;