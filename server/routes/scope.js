const {Scope}= require('.././models/scope');
const mongoose=require('mongoose');
const express= require('express');
const router = express.Router()


router.post('/', async (req,res)=>{

  
    const newScope=new Project({
title:req.body.title,
creator:req.body.creator,
authorId:req.body.author,
description:req.body.description,
dueDate:req.body.dueDate,
    })
    
    newProject.scopeCreatedOn();
    newProject.dueDateOn();
    newProject.timeRemainingOn();
    newProject.lastUpdatedDateOn();
    
    await newScope.save();

    res.send(newScope)
})


module.exports = router;