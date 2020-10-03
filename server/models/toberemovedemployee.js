const mongoose= require('mongoose');
const moment = require('moment');
const Joi = require('joi');
// const config=require('config');
const jwt=require('jsonwebtoken');
const bcrypt= require('bcrypt')
require('dotenv').config();


const employeeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
    isManager: Boolean
  });

  
  employeeSchema.methods.returnPassword = function(){
      
    return this.password
  }

  employeeSchema.methods.generateToken = function(){

    return jwt.sign({_id:this._id, isManager:this.isManager},process.env.SECRET)
  
  }

  
const Employee = mongoose.model("Employee", employeeSchema);

function validateEmployee(user) {
    const schema =Joi.object({
      name: Joi.string().min(2).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
      isManager:Joi.boolean()
    });

    return schema.validate(user);
}

exports.Employee=Employee;
exports.validate=validateEmployee;