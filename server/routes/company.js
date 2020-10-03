const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Company } = require("../models/index.js");
const { validateCompanyData } = require("../middleware/companyValidation");
const { validate } = require("../middleware/signupValidate");

router.post("/:create", validateCompanyData(), validate, (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    // Create a company
    const newCompany = new Company({
      name: data.name,
      url: data.url,
    });

    // name: data.name,
    //   admin: data._id,
    //   url: data.url
    // console.log(req.body)
    newCompany.save();

    res.send(newCompany);
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.send("Company could not be created.");
  }
});

// Get all companies
router.get("/", (req, res) => {
  Company.find({})
    .populate("employees")
    .then((companies) => {
      if (!companies) {
        return res.status(400).json({ companies: "No companies found." });
      } else {
        res.send(companies);
      }
    });
});

//Get one company
router.get("/:id", (req, res) => {
  Company.findById(req.params.id)
    .populate("employees")
    .then((company) => {
      if (!company) {
        return res.status(400).json({ company: "No companies found." });
      } else {
        res.send(company);
      }
    });
});

module.exports = router;
