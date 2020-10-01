require('dotenv').config();
const jwt=require('jsonwebtoken')
const bcrypt= require('bcrypt')
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Employee, Company } = require("../models/index.js");
const {
  validateSignupData,
  validate,
} = require("../middlewares/signupValidate");

//Register new employee
router.post("/register", validateSignupData(), validate, async (req, res) => {
  //TODO: auth verificationdata
  //TODO: hash password
  //TODO: validate response
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
        password: data.password,
        email: data.email,
        company: data.company,
      });

      let pass= employee.returnPassword()
      const salt= await bcrypt.genSalt(10);
      employee.password = await bcrypt.hash(pass, salt)


      // console.log(newEmployee);
      await employee.save()
      // res.send(newEmployee);

      //If new user is not a manager, add their information to their company's database
      //TODO:add a functions to add both managers and not managers
      // if (!employee.isManager) {
      //   Company.findOneAndUpdate({ _id: data.company }),
      //     {
      //       $addToSet: {
      //         employees: {
      //           user: employee._id,
      //           username: employee.username,
      //         },
      //       },
      //     };
      //   res.status(200).json({
      //     message: "Employee created",
      //     employee,
      //   });
      // }
      res.send({
        name:employee.name,
        email:employee.email,
        _id:employee._id
    })

    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

//User login         validate,
router.post("/login", async (req, res) => {
  //TODO: auth verification
  //TODO: hash password
  //TODO: try...catch
  //TODO:add validateSignInData()
  checkUser=await Employee.findOne({email:req.body.email});
   if(!checkUser)return res.status(400).send("invalid email or password");

  const validPassword= await bcrypt.compare(req.body.password, checkUser.password)
   if (!validPassword) return res.status(400).send("invalid email or password");

    const token=await checkUser.generateToken()

   res.send(token)
  

});

//Get all users
router.get("/", (req, res) => {
  Employee.find({}).then((employees) => {
    const employeeData = {};
    employees.forEach((employee) => {
      employeeData[employee._id] = {
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        username: employee.username,
        isManager: employee.isManager,
        password: employee.password,
        email: employee.email,
        projectsCreated: employee.projectsCreated,
        projectsAssigned: employee.projectsAssigned,
        company: employee.company,
      };
    });
    console.log(employeeData);
    res.status(200);
    res.send(employeeData);
  });
});

//Get user by id
router.get("/:id", (req, res) => {
  Employee.findById(req.params.id).then((user) => {
    if (!user) {
      res.status(400);
      return res.send("No user found");
    } else {
      res.send(user);
    }
  });
});

//Delete a user
router.get("/delete/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  await Company.find({ admin: employee._id }, (company) => {
    if (!employee.isManager) {
      Employee.findByIdAndRemove;
    }
  });
});

module.exports = router;
