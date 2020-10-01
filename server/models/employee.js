const mongoose = require("mongoose");
const Joi = require('joi');
const jwt=require('jsonwebtoken');
const bcrypt= require('bcrypt')
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
        required: true
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

employeeSchema.methods.returnPassword = function(){
      
  return this.password
}

employeeSchema.methods.generateToken = function(){

  return jwt.sign(
    {_id:this._id,
      firstName:this.firstName,
      lastName:this.lastName,
      username:this.username,
      email:this.email,
      isManager:this.isManager,
      company:this.company},process.env.SECRET)

}


//Model
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
