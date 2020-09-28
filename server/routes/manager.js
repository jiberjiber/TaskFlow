const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Manager } = require("../models/index");

router.post("/", async (req, res) => {
  const newManager = new Manager({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    isManager: req.body.isManager,
    password: req.body.password,
    email: req.body.email,
    profilePic: req.body.profilePic,
    company: req.body.company,
    projects: req.body.projects
  });

  await newManager.save();

  res.send(newManager);
});

module.exports = router;
