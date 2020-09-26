const {Project}= require('.././models/project');
const mongoose=require('mongoose');
const express= require('express');
const router = express.Router();

router.post('/', async (req,res)=>{

  
    const newProject=new Project({
title:req.body.title,
creator:req.body.creator,
authorId:req.body.author,
description:req.body.description,
dueDate:req.body.dueDate,
    })
    
    newProject.projectCreatedOn();
    newProject.dueDateOn();
    newProject.timeRemainingOn();
    newProject.lastUpdatedDateOn();
    
    await newProject.save();

    res.send(newProject)
})


module.exports = router;