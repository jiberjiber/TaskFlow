const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema
const ManagerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  isManager: {
    //Manager || Team member
    type: Boolean,
    required: true,
    default: false,
  },
  password: {
    //NEEDS VALIDATION
    type: String,
    lowercase: true,
    required: true,
  },
  email: {
    //NEEDS VALIDATION
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  profilePic: {
    //NEEDS VALIDATION
    type: String,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// //Model
const Manager = mongoose.model("Manager", ManagerSchema);

module.exports = Manager;
