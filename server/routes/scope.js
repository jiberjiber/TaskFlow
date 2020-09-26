const {Scope}= require('.././models/scope');
const mongoose=require('mongoose');
const express= require('express');
const router = express.Router()


router.post('/', async (req,res)=>{
    const newScope=new Scope({
scopeName:req.body.scopeName,
dueDate:req.body.dueDate
    })
    
    newScope.scopeCreatedOn();
    newScope.dueDateOn();
    newScope.timeRemainingOn();
    newScope.lastUpdatedDateOn();
    
    await newScope.save();

    res.send(newScope)
})


module.exports = router;