const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Company, Team } = require("../models");
const auth = require("../middleware/auth");
const manager = require("../middleware/managerAuth");
const {validateTeamData, validate} = require("../middleware/teamValidation");

router.post("/add", [auth, manager], validateTeamData(), validate, async (req, res) => {
  try {
    const data = req.body;
    const { _id, firstName, lastName } = req.employee;
    const company = await Company.findOne({ employees: { $in: _id } }).select();
    const newTeam = new Team({
      name: data.name,
      owner: `${firstName} ${lastName}`,
      ownerId: _id,
      assignedScope: data.assignedProjects,
      company: company._id,
    });
    let id= await newTeam.returnid()
    await newTeam.save();
    let teamArray=req.body.members

    teamArray.map(async (x)=>{
     await Team.findByIdAndUpdate(id,
        {$push:{"members":x}},{new: true}
        )

    })
    const getThisTeam= await Team.findById(id).populate('members').select().sort('dateCreated');

    
    console.log(getThisTeam);
    res.send(getThisTeam);


  } catch (err) {
    res.status(400);
    return res.send(err.message);
  }
});

router.get("/", [auth], async (req, res) => {
  const { _id } = req.employee;
  const allTeams = await Team.find({
    $or: [{ ownerId: { $in: _id } }, { members: { $in: _id } }],
  })
    .select()
    .populate("members")
    .populate("assignedScope");

  if (!allTeams) return res.status(400).json({ teams: "No teams to display." });
  res.send(allTeams);
});

router.get("/:id", [auth], async (req, res) => {
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
    const newData = req.body.members;
    const getMember = await Team.findOne({members:{$in: newData}}).select();
    if (getMember) return res.status(400).send("One or more user is already in the team");
    if (!teamId) return res.status(400).send("Please provide a valid team Id");
    if (newData.length == 0)
      return res.status(400).send("No members to display.");
    newData.map(async (info) => {
      await Team.findByIdAndUpdate(
        { _id: teamId },
        { $push: { members: info } },
        { safe: true, upsert: true, new: true }
      );
      const newTeam = await Team.findById(teamId)
        .populate("members")
        .select()
        .sort("firstName");
      res.send(newTeam);
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    await Team.findByIdAndRemove({ _id: req.params.id }, (err) => {
      err
        ? res.status(400).send(err)
        : res.status(200).send("Team deleted successfully!");
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
