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
      const newEmployee = new Employee({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        isManager: data.isManager,
        password: data.password,
        email: data.email,
        // projectsCreated: data.projectsCreated,
        // projectsAssigned: data.projectsAssigned,
        company: data.company,
      });
      // console.log(newEmployee);
      await newEmployee.save();
      // res.send(newEmployee);

      //If new user is not a manager, add their information to their company's database
      if (!newEmployee.isManager) {
        Company.findOneAndUpdate({ _id: data.company }),
          {
            $addToSet: {
              employees: {
                user: newEmployee._id,
                username: newEmployee.username,
              },
            },
          };
        res.status(200).json({
          employee: "Employee created",
          newEmployee,
        });
        console.log(newEmployee);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

//User login
router.post("/login", validate, async (req, res) => {
  //TODO: auth verification
  //TODO: hash password
  //TODO: try...catch
  //TODO:add validateSignInData()

  const { username, password } = req.body;

  //Check if request is valid
  if (password && username) {
    Employee.findOne({ email: email }, (err, userMatch) => {
      if (!userMatch) {
        res.status(401);
        return res.send("Incorrect password or username. Please try again.");
      } else {
        //TODO: logic for validating user password
        if (passwordMatces) {
          //TODO: log user in
        } else {
          res.status(200);
          return res.send("Aut");
        }
      }
    });
  } else {
    res.status(403);
    return res.send("Cannot log in user. Please try again");
  }
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
