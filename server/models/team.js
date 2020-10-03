const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
  },
  owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Employee"
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  // assignedProject: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Team"
  // },
  assignedProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

//Model
const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;
