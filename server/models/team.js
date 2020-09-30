const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    Type: String,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
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
