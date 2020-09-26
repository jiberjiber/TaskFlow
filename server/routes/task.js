const {Task}= require('.././models/task');
const mongoose=require('mongoose');
const express= require('express');
const router = express.Router();


router.post('/', async (req,res)=>{

  
    const newTask=new Task({
task:req.body.task,
description:req.body.description,
dueDate:req.body.dueDate,
    })
    
    newTask.taskCreatedOn();
    newTask.dueDateOn();
    newTask.timeRemainingOn();
    newTask.lastUpdatedDateOn();
    
    await newTask.save();

    res.send(newTask)
})


module.exports = router;