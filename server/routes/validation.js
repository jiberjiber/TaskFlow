require('dotenv').config();
const Joi=require('joi')
const express= require('express');
const time= require("./timestamp");
const mongoose= require('mongoose');
const moment = require('moment');
const {Project}= require('.././models/project');

module.exports={
   validCreateProject:function validate(req) {
    const schema =Joi.object({
        title:Joi.string().min(5).max(50).required(),
        description:Joi.string().min(5).max(255).required(),
        dueDate:Joi.string().min(1).required()
    });

    return schema.validate(req);
},
validScope:function validate(req) {
    
    const schema =Joi.object({
        scopeName:Joi.string().min(3).max(50).required(),
        dueDate:Joi.string().min(1).required(),
        projectId:Joi.string()
    });
    
    return schema.validate(req);
},
validTask:function validate(req) {
    const schema =Joi.object({
        task:Joi.string().min(5).max(75).required(),
        description:Joi.string().min(5).max(255).required(),
        dueDate:Joi.string().min(1).required(),
        scopeId:Joi.string()
    });
    
    return schema.validate(req);
},
checkProjectDueDate: function (duedate,current){
   let due = moment('October 5th 2020','MMMM Do YYYY').fromNow();
    // let newdate=moment(new Date(newdata)).format();
    // let duedate=moment(new Date(current)).format();
    console.log([duedate,current])
    let check= moment(duedate,'MMMM Do YYYY').isAfter(moment(current,'MMMM Do YYYY'))
   
    
    // return dueDate;
    // console.log('running')
    // const getThisProject= Project.findById(req.body.projectId).select('dueDate')
    // console.log(getThisProject)
    return check
  }
}



