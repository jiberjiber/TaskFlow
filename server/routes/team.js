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

router.post("/add", [auth, manager], async (req, res) => {
  try {
    const data = req.body;
    const { _id, firstName, lastName } = req.employee;

    const newTeam = new Team({
      name: data.name,
      owner: `${firstName} ${lastName}`,
      ownerId: _id,
      members: data.members,
      assignedProjects: data.assignedProjects,
    });

    await newTeam.save();
    console.log(newTeam);
    res.send(newTeam);
  } catch (err) {
    res.status(400);
    return res.send("Team could not be created.");
  }
});

router.get("/", async (req, res) => {
  const allTeams = await Team.find({})
    .populate("members")
    .populate("assignedProjects");
  if (!allTeams) return res.status(400).json({ teams: "No teams to display." });
  res.send(allTeams);
});

router.get("/:id", async (req, res) => {
  const oneTeam = await Team.find({ _id: req.params.id })
    .populate("members")
    .select();

  if (!oneTeam)
    return res
      .status(400)
      .json({ team: "A team with this ID does not exist." });
  res.send(oneTeam);
});

router.put("/:id", async (req, res) => {
  try {
    const teamId = req.params.id;
    // const { _id, firstName, lastName } = req.employee;
    const newData = req.body.members;

    if (!teamId) return res.status(400).send("Please provide a valid team Id");
    const updateTeam = await Team.findByIdAndUpdate(
      { _id: teamId },
      { $push: { members: newData } },
      { safe: true, upsert: true, new: true }
    );

    res.send(updateTeam);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// router.delete("/:id", async (req, res) => {

// });

module.exports = router;
