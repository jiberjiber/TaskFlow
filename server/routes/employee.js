const bcrypt= require('bcrypt')
const {Project}= require('.././models/project');
const {Scope}= require('.././models/scope');
const {Task}= require('.././models/task');
const {Employee, validate}=require('.././models/employee');
const mongoose=require('mongoose');
const express= require('express');
const router = express.Router();
const time= require("./timestamp");




router.post('/', async (req,res)=>{
    const {error}= validate(req.body);
    if(error) return res.status(400).send('input does not meet required validation criteria')

   checkUser=await Employee.findOne({email:req.body.email});

   if(checkUser)return res.status(400).send("this email is already registered");

   employee=await new Employee({
       name: req.body.name,
       email:req.body.email,
       password:req.body.password,
       isManager:req.body.isManager
   })

   let pass= employee.returnPassword()
 
   console.log(pass)
   const salt= await bcrypt.genSalt(10);
   employee.password = await bcrypt.hash(pass, salt)

   await employee.save()

   res.send({
       name:employee.name,
       email:employee.email,
       _id:employee._id
   })
})

module.exports=router;