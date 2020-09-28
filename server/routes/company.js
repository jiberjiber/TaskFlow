const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Company } = require("../models/index");


router.post("/", async (req, res) => {
  const newCompany = new Company({
    companyName: req.body.companyName,
    employees: req.body.employees,
    admins: req.body.admins,
    managers: req.body.managers,
  });

  await newCompany.save();

  res.send(newCompany);
});

module.exports = router;
