// const config=require('config')
require('dotenv').config();
const jwt=require('jsonwebtoken')
const Joi=require('joi')
const bcrypt= require('bcrypt')
const {Employee}= require('.././models/employee');
const mongoose=require('mongoose');
const express= require('express');
const router = express.Router();
const time= require("./timestamp");


router.post('/', async (req,res)=>{
    const {error}= validate(req.body);
    if(error) return res.status(400).send('input field requirements not met')

   checkUser=await Employee.findOne({email:req.body.email});
   if(!checkUser)return res.status(400).send("invalid email or password");

  const validPassword= await bcrypt.compare(req.body.password, checkUser.password)
   if (!validPassword) return res.status(400).send("invalid email or password");

    const token=await checkUser.generateToken()

   res.send(token)
})

function validate(req) {
    const schema =Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
}

module.exports=router;