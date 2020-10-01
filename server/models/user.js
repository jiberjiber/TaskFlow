const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema ({
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
        type: Boolean,
        required: true,
        default: false,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        lowercase: true,
        required: true,
      },
      projectsCreated: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
        },
      ],
      projectsAssigned: [
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Project"
          }
      ],
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
      dateCreated: { 
        type: Date,
        default: Date.now,
      },
})

//Model
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
