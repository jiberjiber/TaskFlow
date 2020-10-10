const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Company, Employee } = require("../models/");
const { validateCompanyData } = require("../middleware/companyValidation");
const { validate } = require("../middleware/signupValidate");
const auth = require("../middleware/auth");
const manager = require("../middleware/managerAuth");

router.post("/:create", validateCompanyData(), validate, async (req, res) => {
  try {
    // Create a company
    const data = req.body;
    const getCompany = await Company.findOne({ name: data.name });
    if (getCompany) {
      return res
        .status(400)
        .send(
          "Company already exists. Please choose from the dropdown menu instead."
        );
    } else {
      const newCompany = new Company({
        employees: data.employees,
        name: data.name,
        url: data.url,
        teams: data.teams,
      });
      await newCompany.save();
      res.send(newCompany);
    }
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.send("Company could not be created.");
  }
});

// Get all companies
router.get("/", async (req, res) => {
  const getCompanies = await Company.find({})
    .sort("name")
    .populate("employees")
    .select()
    .populate({ path: "teams", populate: "members" })
    .select();

  if (!getCompanies)
    return res.status(400).json({ teams: "No Companies to display." });
  console.log(getCompanies);
  res.send(getCompanies);
});

//Get one company
router.get("/:id", [auth, manager], async (req, res) => {
  const thisCompany = await Company.find({ _id: req.params.id })
    .populate("employees")
    .sort("firstName")
    .populate({ path: "teams", populate: "members" })
    .select();
  if (!thisCompany) {
    return res.status(400).json({ company: "No companies found." });
  } else {
    res.send(thisCompany);
  }
});

module.exports = router;
